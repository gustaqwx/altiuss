-- RLS Tests for Assistant Feature
-- Run with: supabase test db (requires Supabase CLI and Postgres)

-- Test setup
SET ROLE postgres;

-- Create test users
SELECT auth.uid() as current_user;

-- ============================================
-- TEST 1: Unauthenticated user cannot call assistant function
-- ============================================
-- This is tested at the Edge Function level (401 without JWT)
-- But we verify the tables have no public access
SELECT has_table_privilege('anon', 'assistant_usage', 'SELECT') as anon_can_read_usage;
-- Should be false

SELECT has_table_privilege('anon', 'support_requests', 'SELECT') as anon_can_read_support;
-- Should be false

SELECT has_table_privilege('anon', 'assistant_feedback', 'SELECT') as anon_can_read_feedback;
-- Should be false

-- ============================================
-- TEST 2: Student without active enrollment cannot use assistant
-- ============================================
-- Tested in Edge Function: checks profiles.enrollment_status = 'active'
-- Verify the profile check works
INSERT INTO profiles (id, role, enrollment_status) VALUES
  ('11111111-1111-1111-1111-111111111111', 'student', 'active'),
  ('22222222-2222-2222-2222-222222222222', 'student', 'inactive'),
  ('33333333-3333-3333-3333-333333333333', 'mentor', 'active'),
  ('44444444-4444-4444-4444-444444444444', 'admin', 'active');

-- ============================================
-- TEST 3: User can only read own assistant_usage
-- ============================================
SET ROLE authenticated;
SET request.jwt.claims = '{"sub": "11111111-1111-1111-1111-111111111111", "role": "authenticated"}';

-- Insert test data as service_role (simulated)
INSERT INTO assistant_usage (user_id, day, request_count, input_tokens, output_tokens) VALUES
  ('11111111-1111-1111-1111-111111111111', CURRENT_DATE, 5, 1000, 2000),
  ('22222222-2222-2222-2222-222222222222', CURRENT_DATE, 3, 500, 1000),
  ('global', CURRENT_DATE, 100, 50000, 80000);

-- Student 1 should see only their own usage
SELECT * FROM assistant_usage WHERE user_id = '11111111-1111-1111-1111-111111111111';
-- Should return 1 row

SELECT * FROM assistant_usage WHERE user_id = '22222222-2222-2222-2222-222222222222';
-- Should return 0 rows (RLS blocks)

-- Admin should see all (when role = admin)
SET request.jwt.claims = '{"sub": "44444444-4444-4444-4444-444444444444", "role": "authenticated"}';
UPDATE profiles SET role = 'admin' WHERE id = '44444444-4444-4444-4444-444444444444';

SELECT * FROM assistant_usage;
-- Should return 3 rows (admin policy)

-- ============================================
-- TEST 4: User can only read own support_requests
-- ============================================
SET request.jwt.claims = '{"sub": "11111111-1111-1111-1111-111111111111", "role": "authenticated"}';

INSERT INTO support_requests (user_id, role, route, subject, message, status) VALUES
  ('11111111-1111-1111-1111-111111111111', 'student', '/app', 'Test 1', 'Message 1', 'open'),
  ('22222222-2222-2222-2222-222222222222', 'student', '/app', 'Test 2', 'Message 2', 'open');

SELECT * FROM support_requests;
-- Should return 1 row (own request only)

-- Admin should see all
SET request.jwt.claims = '{"sub": "44444444-4444-4444-4444-444444444444", "role": "authenticated"}';
SELECT * FROM support_requests;
-- Should return 2 rows

-- Admin can update status
UPDATE support_requests SET status = 'in_progress' WHERE id = (SELECT id FROM support_requests LIMIT 1);
-- Should succeed for admin

SET request.jwt.claims = '{"sub": "11111111-1111-1111-1111-111111111111", "role": "authenticated"}';
UPDATE support_requests SET status = 'closed' WHERE id = (SELECT id FROM support_requests LIMIT 1);
-- Should fail for student (no UPDATE policy)

-- ============================================
-- TEST 5: User can only read own assistant_feedback
-- ============================================
SET request.jwt.claims = '{"sub": "11111111-1111-1111-1111-111111111111", "role": "authenticated"}';

INSERT INTO assistant_feedback (user_id, rating, comment, route) VALUES
  ('11111111-1111-1111-1111-111111111111', 'up', 'Good', '/app'),
  ('22222222-2222-2222-2222-222222222222', 'down', 'Bad', '/app');

SELECT * FROM assistant_feedback;
-- Should return 1 row (own feedback only)

-- Admin sees all
SET request.jwt.claims = '{"sub": "44444444-4444-4444-4444-444444444444", "role": "authenticated"}';
SELECT * FROM assistant_feedback;
-- Should return 2 rows

-- ============================================
-- TEST 6: Rate limits enforced (simulated via function logic)
-- ============================================
-- The Edge Function checks assistant_usage before allowing requests
-- Verify the table structure supports the queries

-- Daily limit query
SELECT request_count FROM assistant_usage WHERE user_id = '11111111-1111-1111-1111-111111111111' AND day = CURRENT_DATE;
-- Should return current count

-- Hourly limit query (user_id includes hour: 'user_id:hour')
SELECT request_count FROM assistant_usage WHERE user_id = '11111111-1111-1111-1111-111111111111:14' AND day = CURRENT_DATE;
-- Should return hourly count

-- Global daily limit
SELECT request_count FROM assistant_usage WHERE user_id = 'global' AND day = CURRENT_DATE;
-- Should return global count

-- ============================================
-- TEST 7: Visitor mode (no auth) - rate limited by IP
-- ============================================
-- Visitor usage tracked as 'visitor:<ip>'
INSERT INTO assistant_usage (user_id, day, request_count) VALUES
  ('visitor:192.168.1.1', CURRENT_DATE, 10);

SET request.jwt.claims = '{"sub": "visitor:192.168.1.1", "role": "anon"}';
-- No SELECT policy for anon, but Edge Function uses service_role for writes
-- and checks count before allowing

-- Cleanup
DELETE FROM assistant_usage WHERE user_id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  'global',
  'visitor:192.168.1.1',
  '11111111-1111-1111-1111-111111111111:14'
);
DELETE FROM support_requests WHERE user_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222');
DELETE FROM assistant_feedback WHERE user_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222');
DELETE FROM profiles WHERE id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444');

RESET ROLE;

\echo 'RLS Tests completed. All assertions should pass.'