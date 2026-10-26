-- Assistant feature tables
-- Created: 2026-10-23

-- assistant_usage: tracks usage per user/day/hour for rate limiting
CREATE TABLE IF NOT EXISTS assistant_usage (
    user_id TEXT NOT NULL,
    day DATE NOT NULL DEFAULT CURRENT_DATE,
    request_count INTEGER NOT NULL DEFAULT 0,
    input_tokens INTEGER NOT NULL DEFAULT 0,
    output_tokens INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, day)
);

-- Index for global daily limit queries
CREATE INDEX IF NOT EXISTS idx_assistant_usage_global_day
    ON assistant_usage (day) WHERE user_id = 'global';

-- Index for hourly limit queries
CREATE INDEX IF NOT EXISTS idx_assistant_usage_hourly
    ON assistant_usage (user_id, day) WHERE user_id LIKE '%:%';

-- RLS for assistant_usage
ALTER TABLE assistant_usage ENABLE ROW LEVEL SECURITY;

-- Users can read their own usage
CREATE POLICY "Users can read own usage"
    ON assistant_usage FOR SELECT
    USING (user_id = auth.uid()::text OR user_id LIKE auth.uid()::text || ':%');

-- Admins can read aggregated usage (all)
CREATE POLICY "Admins can read all usage"
    ON assistant_usage FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Only the Edge Function (service_role) can insert/update
-- No policy for INSERT/UPDATE - only service_role bypasses RLS


-- support_requests: human handoff requests
CREATE TABLE IF NOT EXISTS support_requests (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('student', 'mentor', 'instructor', 'admin', 'visitor')),
    route TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'closed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    closed_at TIMESTAMPTZ,
    PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS idx_support_requests_user_id ON support_requests (user_id);
CREATE INDEX IF NOT EXISTS idx_support_requests_status ON support_requests (status);
CREATE INDEX IF NOT EXISTS idx_support_requests_created_at ON support_requests (created_at DESC);

-- RLS for support_requests
ALTER TABLE support_requests ENABLE ROW LEVEL SECURITY;

-- Users can create their own requests
CREATE POLICY "Users can create own support requests"
    ON support_requests FOR INSERT
    WITH CHECK (user_id = auth.uid());

-- Users can read their own requests
CREATE POLICY "Users can read own support requests"
    ON support_requests FOR SELECT
    USING (user_id = auth.uid());

-- Admins can read all requests
CREATE POLICY "Admins can read all support requests"
    ON support_requests FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Admins can update status
CREATE POLICY "Admins can update support request status"
    ON support_requests FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );


-- assistant_feedback: thumb up/down on responses
CREATE TABLE IF NOT EXISTS assistant_feedback (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    rating TEXT NOT NULL CHECK (rating IN ('up', 'down')),
    comment TEXT,
    route TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS idx_assistant_feedback_user_id ON assistant_feedback (user_id);
CREATE INDEX IF NOT EXISTS idx_assistant_feedback_created_at ON assistant_feedback (created_at DESC);

-- RLS for assistant_feedback
ALTER TABLE assistant_feedback ENABLE ROW LEVEL SECURITY;

-- Users can create their own feedback
CREATE POLICY "Users can create own feedback"
    ON assistant_feedback FOR INSERT
    WITH CHECK (user_id = auth.uid());

-- Users can read their own feedback
CREATE POLICY "Users can read own feedback"
    ON assistant_feedback FOR SELECT
    USING (user_id = auth.uid());

-- Admins can read all feedback (aggregated view)
CREATE POLICY "Admins can read all feedback"
    ON assistant_feedback FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );