create extension if not exists pgtap with schema extensions;
begin;
set local search_path = extensions, public, auth;
select plan(16);

-- Fixtures use fixed UUIDs and roll back after the test. A production seed must never reuse these.
insert into auth.users (id,aud,role,email,encrypted_password,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,created_at,updated_at)
values
('10000000-0000-4000-8000-000000000001','authenticated','authenticated','admin-test@example.invalid','',now(),'{}','{"full_name":"Admin Test"}',now(),now()),
('20000000-0000-4000-8000-000000000002','authenticated','authenticated','instructor-test@example.invalid','',now(),'{}','{"full_name":"Instrutor Test"}',now(),now()),
('22000000-0000-4000-8000-000000000004','authenticated','authenticated','instructor-two@example.invalid','',now(),'{}','{"full_name":"Outro Instrutor"}',now(),now()),
('30000000-0000-4000-8000-000000000003','authenticated','authenticated','student-test@example.invalid','',now(),'{}','{"full_name":"Aluno Teste"}',now(),now());
update public.profiles set role='admin' where id='10000000-0000-4000-8000-000000000001';
update public.profiles set role='instructor' where id in ('20000000-0000-4000-8000-000000000002','22000000-0000-4000-8000-000000000004');
insert into public.activities(id,phase,phase_index,title) values ('40000000-0000-4000-8000-000000000004','Explorar',0,'RLS Test Activity');
insert into public.lessons(id,title,youtube_video_id,created_by,status,axis) values
('50000000-0000-4000-8000-000000000005','Lesson by other instructor','abcdefghijk','22000000-0000-4000-8000-000000000004','draft','Explorar');
insert into public.live_sessions(id,title,mode,youtube_video_id,created_by,status,starts_at) values
('60000000-0000-4000-8000-000000000006','Live test','youtube_live','abcdefghijk','10000000-0000-4000-8000-000000000001','scheduled',now());

set local role authenticated;
select set_config('request.jwt.claim.sub','20000000-0000-4000-8000-000000000002',true);
select is((select count(*)::int from public.profiles where id='30000000-0000-4000-8000-000000000003'),0,'Instructor cannot read another profile or its email');
select throws_ok($$select email from auth.users where id='30000000-0000-4000-8000-000000000003'$$,'42501',null,'Instructor cannot read auth email');
select throws_ok($$update public.profiles set role='admin' where id='20000000-0000-4000-8000-000000000002'$$,'42501',null,'Instructor cannot change a role directly');
select is((select count(*)::int from public.list_students_for_instructor()),1,'Instructor RPC returns only the restricted roster rows');
select is((select count(*)::int from public.lessons where id='50000000-0000-4000-8000-000000000005'),0,'Instructor cannot read another instructor draft');
select is((with changed as (update public.lessons set title='stolen' where id='50000000-0000-4000-8000-000000000005' returning id) select count(*)::int from changed),0,'Instructor cannot edit another instructor lesson');
select throws_ok($$select public.promote_user('30000000-0000-4000-8000-000000000003','mentor')$$,'42501',null,'Instructor cannot promote a user');
select throws_ok($$insert into public.mentor_students(mentor_id,student_id) values('20000000-0000-4000-8000-000000000002','30000000-0000-4000-8000-000000000003')$$,'42501',null,'Instructor cannot write mentor_students');
select throws_ok($$insert into public.enrollments(student_id,status) values('30000000-0000-4000-8000-000000000003','active')$$,'42501',null,'Instructor cannot write enrollments');
select throws_ok($$insert into public.audit_log(actor_id,action) values('20000000-0000-4000-8000-000000000002','forbidden')$$,'42501',null,'Instructor cannot write audit_log');
reset role;
set local role authenticated;
select set_config('request.jwt.claim.sub','30000000-0000-4000-8000-000000000003',true);
select is((select count(*)::int from public.lessons where status='draft'),0,'Student cannot read draft lessons');
select is((select count(*)::int from public.live_sessions),0,'Student without active enrollment cannot see live sessions or links');
select throws_ok($$insert into public.lessons(title,youtube_video_id,created_by,status,axis) values('forbidden','abcdefghijk','30000000-0000-4000-8000-000000000003','draft','Explorar')$$,'42501',null,'Student cannot write lessons');
select throws_ok($$insert into public.live_sessions(title,mode,meeting_url,created_by,status,starts_at) values('forbidden','meeting','https://example.invalid','30000000-0000-4000-8000-000000000003','scheduled',now())$$,'42501',null,'Student cannot write live_sessions');
reset role;
set local role authenticated;
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000001',true);
select lives_ok($$select public.promote_user('30000000-0000-4000-8000-000000000003','mentor')$$,'Admin can promote through the guarded RPC');
select is((select count(*)::int from public.audit_log where actor_id='10000000-0000-4000-8000-000000000001' and target_id='30000000-0000-4000-8000-000000000003' and action='promote_user'),1,'Admin promotion is recorded in audit_log');
select * from finish();
rollback;
