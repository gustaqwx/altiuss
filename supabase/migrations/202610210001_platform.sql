create extension if not exists pgcrypto;

do $$ begin
  create type public.app_role as enum ('student', 'mentor', 'instructor', 'admin');
exception when duplicate_object then null; end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  role public.app_role not null default 'student',
  created_at timestamptz not null default now()
);
create table if not exists public.phases (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  position smallint not null unique,
  period text not null,
  description text not null default ''
);
create table if not exists public.student_progress (
  student_id uuid primary key references public.profiles(id) on delete cascade,
  current_phase text not null default 'Explorar',
  progress smallint not null default 0 check (progress between 0 and 100),
  last_activity timestamptz
);
create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  phase text not null check (phase in ('Explorar','Desenvolver','Aplicar','Decolar')),
  phase_index smallint not null check (phase_index between 0 and 3),
  title text not null,
  prompt text not null default 'A definir com a Altius',
  criteria jsonb not null default '["A definir com a Altius"]'::jsonb,
  due_at timestamptz,
  position smallint not null default 1,
  created_at timestamptz not null default now()
);
create table if not exists public.competency_progress (
  student_id uuid not null references public.profiles(id) on delete cascade,
  competency text not null check (competency in ('Pensamento Analítico','IA & Big Data','Programação & Sistemas','Flexibilidade & Resiliência','Colaboração & Empatia','Liderança & Networking')),
  progress smallint not null check (progress between 0 and 100),
  updated_at timestamptz not null default now(),
  primary key(student_id,competency)
);
create table if not exists public.mentor_students (
  mentor_id uuid not null references public.profiles(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (mentor_id, student_id)
);
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'active' check (status in ('active','paused','completed','cancelled')),
  created_at timestamptz not null default now()
);
create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid not null references public.activities(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  version integer not null check (version > 0),
  content_text text not null default '',
  link_url text,
  state text not null default 'submitted' check (state in ('submitted','in_review','feedback','approved','changes_requested')),
  created_at timestamptz not null default now(),
  unique (activity_id, student_id, version),
  check (length(content_text) > 0 or link_url is not null)
);
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  activity_id uuid not null references public.activities(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  reviewer_id uuid not null references public.profiles(id),
  criteria_scores jsonb not null default '[]'::jsonb,
  comments text not null default '',
  status text not null check (status in ('feedback','approved','changes_requested')),
  created_at timestamptz not null default now()
);
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  youtube_video_id text not null check (youtube_video_id ~ '^[A-Za-z0-9_-]{11}$'),
  created_by uuid not null default auth.uid() references public.profiles(id),
  status text not null default 'draft' check (status in ('draft','published')),
  axis text not null check (axis in ('Explorar','Desenvolver','Aplicar','Decolar')),
  position integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.live_sessions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  mode text not null check (mode in ('meeting','youtube_live')),
  meeting_url text,
  youtube_video_id text,
  created_by uuid not null default auth.uid() references public.profiles(id),
  status text not null default 'scheduled' check (status in ('scheduled','cancelled','completed')),
  starts_at timestamptz not null,
  recording_lesson_id uuid references public.lessons(id) on delete set null,
  created_at timestamptz not null default now(),
  check ((mode = 'meeting' and meeting_url is not null and meeting_url ~ '^https://' and youtube_video_id is null) or (mode = 'youtube_live' and meeting_url is null and youtube_video_id is not null and youtube_video_id ~ '^[A-Za-z0-9_-]{11}$'))
);
create table if not exists public.live_attendance (
  live_session_id uuid not null references public.live_sessions(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  marked_by uuid not null references public.profiles(id),
  present boolean not null default true,
  marked_at timestamptz not null default now(),
  primary key (live_session_id, student_id)
);
create table if not exists public.lesson_completions (
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  completed_at timestamptz not null default now(),
  primary key (lesson_id, student_id)
);
create table if not exists public.mentoring_sessions (
  id uuid primary key default gen_random_uuid(),
  mentor_id uuid not null references public.profiles(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  held_at date not null,
  notes text not null default '',
  created_at timestamptz not null default now()
);
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid not null references public.profiles(id),
  target_id uuid references public.profiles(id),
  action text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.bootstrap_profile() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''), 'student')
  on conflict (id) do nothing;
  insert into public.student_progress (student_id) values (new.id) on conflict do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile after insert on auth.users for each row execute function public.bootstrap_profile();

create or replace function public.current_app_role() returns public.app_role
language sql stable security definer set search_path = public, pg_temp as $$
  select role from public.profiles where id = auth.uid()
$$;
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public, pg_temp as $$
  select coalesce(public.current_app_role() = 'admin', false)
$$;
create or replace function public.promote_user(target_user_id uuid, new_role public.app_role) returns public.profiles
language plpgsql security definer set search_path = public, pg_temp as $$
declare changed public.profiles;
begin
  if auth.uid() is null or not public.is_admin() then raise exception 'admin_required' using errcode = '42501'; end if;
  if new_role not in ('mentor','instructor') then raise exception 'invalid_promotion_role' using errcode = '22023'; end if;
  update public.profiles set role = new_role where id = target_user_id and role = 'student' returning * into changed;
  if changed.id is null then raise exception 'student_not_found_or_already_promoted' using errcode = 'P0002'; end if;
  insert into public.audit_log(actor_id, target_id, action, details)
  values (auth.uid(), target_user_id, 'promote_user', jsonb_build_object('role', new_role));
  return changed;
end $$;

create or replace function public.list_students_for_admin()
returns table(user_id uuid, name text, email text, phase text, progress smallint, last_activity timestamptz, mentor text, enrollment_status text)
language plpgsql stable security definer set search_path = public, auth, pg_temp as $$
begin
  if not public.is_admin() then raise exception 'admin_required' using errcode = '42501'; end if;
  return query select p.id, p.full_name, u.email, coalesce(sp.current_phase,'Explorar'), coalesce(sp.progress,0), sp.last_activity,
    m.full_name, e.status from public.profiles p join auth.users u on u.id=p.id left join public.student_progress sp on sp.student_id=p.id
    left join lateral (select mentor.full_name from public.mentor_students ms join public.profiles mentor on mentor.id=ms.mentor_id where ms.student_id=p.id limit 1) m on true
    left join lateral (select en.status from public.enrollments en where en.student_id=p.id order by en.created_at desc limit 1) e on true
    where p.role='student' order by p.full_name;
end $$;
create or replace function public.list_students_for_instructor()
returns table(name text, phase text, progress smallint, last_activity timestamptz)
language plpgsql stable security definer set search_path = public, pg_temp as $$
begin
  if auth.uid() is null or public.current_app_role() is distinct from 'instructor' then raise exception 'instructor_required' using errcode = '42501'; end if;
  return query select p.full_name, coalesce(sp.current_phase,'Explorar'), coalesce(sp.progress,0), sp.last_activity
    from public.profiles p left join public.student_progress sp on sp.student_id=p.id where p.role='student' order by p.full_name;
end $$;
create or replace function public.list_users_for_admin()
returns table(user_id uuid, name text, email text, role public.app_role)
language plpgsql stable security definer set search_path = public, auth, pg_temp as $$
begin
  if not public.is_admin() then raise exception 'admin_required' using errcode = '42501'; end if;
  return query select p.id,p.full_name,u.email,p.role from public.profiles p join auth.users u on u.id=p.id order by p.full_name;
end $$;
create or replace function public.assign_mentor(target_student_id uuid, target_mentor_id uuid) returns void
language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if not public.is_admin() then raise exception 'admin_required' using errcode = '42501'; end if;
  if not exists(select 1 from public.profiles where id=target_student_id and role='student') or not exists(select 1 from public.profiles where id=target_mentor_id and role='mentor') then raise exception 'invalid_association'; end if;
  insert into public.mentor_students(mentor_id,student_id) values(target_mentor_id,target_student_id) on conflict do nothing;
end $$;
create or replace function public.list_mentor_students()
returns table(user_id uuid, name text, phase text, progress smallint, last_activity timestamptz)
language plpgsql stable security definer set search_path = public, pg_temp as $$
begin
  if auth.uid() is null or public.current_app_role() is distinct from 'mentor' then raise exception 'mentor_required' using errcode = '42501'; end if;
  return query select p.id,p.full_name,coalesce(sp.current_phase,'Explorar'),coalesce(sp.progress,0),sp.last_activity
  from public.mentor_students ms join public.profiles p on p.id=ms.student_id left join public.student_progress sp on sp.student_id=p.id where ms.mentor_id=auth.uid();
end $$;
create or replace function public.admin_overview() returns jsonb
language plpgsql stable security definer set search_path = public, pg_temp as $$
declare result jsonb;
begin
  if not public.is_admin() then raise exception 'admin_required' using errcode = '42501'; end if;
  select jsonb_build_object('students',(select count(*) from public.profiles where role='student'),'mentors',(select count(*) from public.profiles where role='mentor'),'instructors',(select count(*) from public.profiles where role='instructor'),'pending',(select count(*) from public.submissions where state in ('submitted','in_review'))) into result;
  return result;
end $$;
create or replace function public.list_pending_submissions() returns table(id uuid,title text,phase text,student text,created_at timestamptz,content_text text,link_url text,state text)
language plpgsql stable security definer set search_path = public, pg_temp as $$
begin
  if auth.uid() is null or public.current_app_role() not in ('mentor','admin') then raise exception 'reviewer_required' using errcode = '42501'; end if;
  return query select s.id,a.title,a.phase,p.full_name,s.created_at,s.content_text,s.link_url,s.state from public.submissions s join public.activities a on a.id=s.activity_id join public.profiles p on p.id=s.student_id
  where s.state in ('submitted','in_review') and (public.is_admin() or exists(select 1 from public.mentor_students ms where ms.mentor_id=auth.uid() and ms.student_id=s.student_id)) order by s.created_at;
end $$;
create or replace function public.mark_live_attendance(target_session_id uuid, student_name text) returns void
language plpgsql security definer set search_path = public, pg_temp as $$
declare selected_student uuid; session_owner uuid; matching_students integer;
begin
  select created_by into session_owner from public.live_sessions where id=target_session_id;
  if auth.uid() is null or (not public.is_admin() and not (public.current_app_role()='instructor' and session_owner=auth.uid())) then raise exception 'session_owner_required' using errcode='42501'; end if;
  select count(*) into matching_students from public.profiles where role='student' and full_name=student_name;
  if matching_students=0 then raise exception 'student_not_found'; end if;
  if matching_students>1 then raise exception 'student_name_is_ambiguous'; end if;
  select id into selected_student from public.profiles where role='student' and full_name=student_name;
  insert into public.live_attendance(live_session_id,student_id,marked_by) values(target_session_id,selected_student,auth.uid())
  on conflict(live_session_id,student_id) do update set present=true,marked_by=auth.uid(),marked_at=now();
end $$;

alter table public.profiles enable row level security;
alter table public.phases enable row level security;
alter table public.student_progress enable row level security;
alter table public.activities enable row level security;
alter table public.competency_progress enable row level security;
alter table public.mentor_students enable row level security;
alter table public.enrollments enable row level security;
alter table public.submissions enable row level security;
alter table public.feedback enable row level security;
alter table public.lessons enable row level security;
alter table public.live_sessions enable row level security;
alter table public.live_attendance enable row level security;
alter table public.lesson_completions enable row level security;
alter table public.mentoring_sessions enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_log enable row level security;

create policy profiles_self_read on public.profiles for select to authenticated using (id=auth.uid() or public.is_admin());
create policy profiles_self_update on public.profiles for update to authenticated using (id=auth.uid() and public.current_app_role()='student') with check (id=auth.uid() and role='student');
create policy profiles_admin_all on public.profiles for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy phases_authenticated_read on public.phases for select to authenticated using (true);
create policy progress_student_read on public.student_progress for select to authenticated using (student_id=auth.uid() or public.is_admin());
create policy progress_admin_all on public.student_progress for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy competency_self_admin_read on public.competency_progress for select to authenticated using (student_id=auth.uid() or public.is_admin());
create policy competency_admin_all on public.competency_progress for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy activities_authenticated_read on public.activities for select to authenticated using (true);
create policy mentor_students_read on public.mentor_students for select to authenticated using (mentor_id=auth.uid() or public.is_admin());
create policy mentor_students_admin_all on public.mentor_students for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy enrollments_self_admin_read on public.enrollments for select to authenticated using (student_id=auth.uid() or public.is_admin());
create policy enrollments_admin_write on public.enrollments for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy submissions_self_read on public.submissions for select to authenticated using (student_id=auth.uid() or public.is_admin() or exists(select 1 from public.mentor_students ms where ms.student_id=submissions.student_id and ms.mentor_id=auth.uid()));
create policy submissions_admin_all on public.submissions for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy lessons_read_published_or_owner on public.lessons for select to authenticated using (public.is_admin() or (public.current_app_role()='instructor' and created_by=auth.uid()) or status='published');
create policy lessons_admin_all on public.lessons for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy lessons_instructor_insert on public.lessons for insert to authenticated with check (public.current_app_role()='instructor' and created_by=auth.uid());
create policy lessons_instructor_update on public.lessons for update to authenticated using (public.current_app_role()='instructor' and created_by=auth.uid()) with check (public.current_app_role()='instructor' and created_by=auth.uid());
create policy lessons_instructor_delete on public.lessons for delete to authenticated using (public.current_app_role()='instructor' and created_by=auth.uid());
create policy live_sessions_read_enrolled_or_owner on public.live_sessions for select to authenticated using (public.is_admin() or (public.current_app_role()='instructor' and created_by=auth.uid()) or (status in ('scheduled','cancelled','completed') and exists(select 1 from public.enrollments e where e.student_id=auth.uid() and e.status='active')));
create policy live_sessions_admin_all on public.live_sessions for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy live_sessions_instructor_insert on public.live_sessions for insert to authenticated with check (public.current_app_role()='instructor' and created_by=auth.uid());
create policy live_sessions_instructor_update on public.live_sessions for update to authenticated using (public.current_app_role()='instructor' and created_by=auth.uid()) with check (public.current_app_role()='instructor' and created_by=auth.uid());
create policy live_sessions_instructor_delete on public.live_sessions for delete to authenticated using (public.current_app_role()='instructor' and created_by=auth.uid());
create policy attendance_admin_or_owner_read on public.live_attendance for select to authenticated using (public.is_admin() or exists(select 1 from public.live_sessions ls where ls.id=live_session_id and ls.created_by=auth.uid()));
create policy attendance_student_self_read on public.live_attendance for select to authenticated using (student_id=auth.uid());
create policy completions_self_all on public.lesson_completions for all to authenticated using (student_id=auth.uid() and public.current_app_role()='student') with check (student_id=auth.uid() and public.current_app_role()='student');
create policy mentoring_mentor_assigned on public.mentoring_sessions for all to authenticated using (public.is_admin() or (mentor_id=auth.uid() and exists(select 1 from public.mentor_students ms where ms.mentor_id=auth.uid() and ms.student_id=mentoring_sessions.student_id))) with check (public.is_admin() or (mentor_id=auth.uid() and exists(select 1 from public.mentor_students ms where ms.mentor_id=auth.uid() and ms.student_id=mentoring_sessions.student_id)));
create policy notifications_self_all on public.notifications for all to authenticated using (user_id=auth.uid() or public.is_admin()) with check (user_id=auth.uid() or public.is_admin());
create policy audit_admin_read on public.audit_log for select to authenticated using (public.is_admin());

revoke all on public.audit_log from anon, authenticated;
grant select on public.audit_log to authenticated;
grant execute on function public.promote_user(uuid,public.app_role) to authenticated;
grant execute on function public.list_students_for_admin() to authenticated;
grant execute on function public.list_students_for_instructor() to authenticated;
grant execute on function public.list_users_for_admin() to authenticated;
grant execute on function public.assign_mentor(uuid,uuid) to authenticated;
grant execute on function public.list_mentor_students() to authenticated;
grant execute on function public.admin_overview() to authenticated;
grant execute on function public.list_pending_submissions() to authenticated;
grant execute on function public.mark_live_attendance(uuid,text) to authenticated;

create or replace function public.student_journey() returns jsonb
language plpgsql stable security definer set search_path = public, pg_temp as $$
declare result jsonb;
begin
  if auth.uid() is null or public.current_app_role() is distinct from 'student' then raise exception 'student_required' using errcode='42501'; end if;
  select coalesce(jsonb_agg(jsonb_build_object(
    'id',a.id,'phase',a.phase,'phaseIndex',a.phase_index,'title',a.title,'criteria',a.criteria,'dueAt',a.due_at,
    'state',coalesce(latest.state,'not_started'),'feedback',latest_feedback.feedback_json,'versions',coalesce(history.versions,'[]'::jsonb)
  ) order by a.phase_index,a.position),'[]'::jsonb) into result
  from public.activities a
  left join lateral (select s.state from public.submissions s where s.activity_id=a.id and s.student_id=auth.uid() order by s.version desc limit 1) latest on true
  left join lateral (select jsonb_build_object('comments',f.comments,'scores',f.criteria_scores,'status',f.status) as feedback_json from public.feedback f where f.activity_id=a.id and f.student_id=auth.uid() order by f.created_at desc limit 1) latest_feedback on true
  left join lateral (select jsonb_agg(jsonb_build_object('id',s.id,'text',s.content_text,'link',s.link_url,'createdAt',s.created_at,'state',s.state) order by s.version desc) as versions from public.submissions s where s.activity_id=a.id and s.student_id=auth.uid()) history on true;
  return result;
end $$;
create or replace function public.submit_activity(target_activity_id uuid, content_text text, link_url text default null) returns public.submissions
language plpgsql security definer set search_path = public, pg_temp as $$
declare next_version integer; created public.submissions;
begin
  if auth.uid() is null or public.current_app_role() is distinct from 'student' then raise exception 'student_required' using errcode='42501'; end if;
  if length(trim(coalesce(content_text,'')))=0 and link_url is null then raise exception 'submission_required' using errcode='22023'; end if;
  if not exists(select 1 from public.activities where id=target_activity_id) then raise exception 'activity_not_found' using errcode='P0002'; end if;
  if exists(select 1 from public.submissions s where s.id=(select latest.id from public.submissions latest where latest.activity_id=target_activity_id and latest.student_id=auth.uid() order by latest.version desc limit 1) and s.state <> 'changes_requested') then raise exception 'resubmission_not_allowed' using errcode='42501'; end if;
  select coalesce(max(version),0)+1 into next_version from public.submissions where activity_id=target_activity_id and student_id=auth.uid();
  insert into public.submissions(activity_id,student_id,version,content_text,link_url,state) values(target_activity_id,auth.uid(),next_version,coalesce(content_text,''),link_url,'submitted') returning * into created;
  update public.student_progress set last_activity=now() where student_id=auth.uid();
  return created;
end $$;
create or replace function public.review_submission(target_submission_id uuid, criteria_scores jsonb, comments text, result_status text) returns void
language plpgsql security definer set search_path = public, pg_temp as $$
declare target public.submissions;
begin
  if auth.uid() is null or public.current_app_role() not in ('mentor','admin') then raise exception 'reviewer_required' using errcode='42501'; end if;
  if result_status not in ('feedback','approved','changes_requested') then raise exception 'invalid_review_status'; end if;
  select * into target from public.submissions where id=target_submission_id;
  if target.id is null then raise exception 'submission_not_found' using errcode='P0002'; end if;
  if not public.is_admin() and not exists(select 1 from public.mentor_students where mentor_id=auth.uid() and student_id=target.student_id) then raise exception 'mentor_not_assigned' using errcode='42501'; end if;
  update public.submissions set state=result_status where id=target.id;
  insert into public.feedback(submission_id,activity_id,student_id,reviewer_id,criteria_scores,comments,status)
  values(target.id,target.activity_id,target.student_id,auth.uid(),coalesce(criteria_scores,'[]'::jsonb),coalesce(comments,''),result_status);
  insert into public.notifications(user_id,title) select target.student_id,'Novo feedback: '||a.title from public.activities a where a.id=target.activity_id;
  update public.student_progress sp set last_activity=now(), progress=least(100,((select count(distinct s.activity_id)*100/(select greatest(count(*),1) from public.activities) from public.submissions s where s.student_id=target.student_id and s.state='approved'))) where sp.student_id=target.student_id;
end $$;
create or replace function public.start_review(target_submission_id uuid) returns void
language plpgsql security definer set search_path = public, pg_temp as $$
declare target public.submissions;
begin
  if auth.uid() is null or public.current_app_role() not in ('mentor','admin') then raise exception 'reviewer_required' using errcode='42501'; end if;
  select * into target from public.submissions where id=target_submission_id;
  if target.id is null or target.state not in ('submitted','in_review') then raise exception 'submission_not_pending' using errcode='P0002'; end if;
  if not public.is_admin() and not exists(select 1 from public.mentor_students where mentor_id=auth.uid() and student_id=target.student_id) then raise exception 'mentor_not_assigned' using errcode='42501'; end if;
  update public.submissions set state='in_review' where id=target.id;
end $$;
create or replace function public.complete_lesson(target_lesson_id uuid) returns void
language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if auth.uid() is null or public.current_app_role() is distinct from 'student' then raise exception 'student_required' using errcode='42501'; end if;
  if not exists(select 1 from public.lessons where id=target_lesson_id and status='published') then raise exception 'lesson_unavailable' using errcode='42501'; end if;
  insert into public.lesson_completions(lesson_id,student_id) values(target_lesson_id,auth.uid()) on conflict do nothing;
end $$;
create or replace function public.create_mentoring_session(held_at date, notes text, target_student_id uuid) returns public.mentoring_sessions
language plpgsql security definer set search_path = public, pg_temp as $$
declare created public.mentoring_sessions;
begin
  if auth.uid() is null or public.current_app_role() is distinct from 'mentor' or not exists(select 1 from public.mentor_students where mentor_id=auth.uid() and student_id=target_student_id) then raise exception 'mentor_student_required' using errcode='42501'; end if;
  insert into public.mentoring_sessions(mentor_id,student_id,held_at,notes) values(auth.uid(),target_student_id,held_at,coalesce(notes,'')) returning * into created;
  return created;
end $$;

create policy feedback_admin_all on public.feedback for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy feedback_student_read on public.feedback for select to authenticated using (student_id=auth.uid() or public.is_admin() or exists(select 1 from public.mentor_students ms where ms.student_id=feedback.student_id and ms.mentor_id=auth.uid()));
create policy completions_admin_read on public.lesson_completions for select to authenticated using (public.is_admin());
revoke update (role) on public.profiles from authenticated;
revoke insert, update, delete on public.audit_log from anon, authenticated;
grant select on public.profiles to authenticated;
grant select on public.activities to authenticated;
grant select on public.phases to authenticated;
grant select, insert, update, delete on public.competency_progress to authenticated;
grant select, insert, update, delete on public.submissions to authenticated;
grant select, insert, update, delete on public.feedback to authenticated;
grant select, insert, update, delete on public.mentor_students to authenticated;
grant select, insert, update, delete on public.enrollments to authenticated;
grant select on public.audit_log to authenticated;
grant update (full_name) on public.profiles to authenticated;
grant select, insert, update, delete on public.submissions to authenticated;
grant select, insert, update, delete on public.feedback to authenticated;
grant select, insert, update, delete on public.lessons to authenticated;
grant select, insert, update, delete on public.live_sessions to authenticated;
grant select on public.live_attendance to authenticated;
grant select, insert on public.lesson_completions to authenticated;
grant select, insert on public.mentoring_sessions to authenticated;
grant select, update on public.notifications to authenticated;
grant execute on function public.student_journey() to authenticated;
grant execute on function public.mark_live_attendance(uuid,text) to authenticated;
grant execute on function public.submit_activity(uuid,text,text) to authenticated;
grant execute on function public.review_submission(uuid,jsonb,text,text) to authenticated;
grant execute on function public.start_review(uuid) to authenticated;
grant execute on function public.complete_lesson(uuid) to authenticated;
grant execute on function public.create_mentoring_session(date,text,uuid) to authenticated;

insert into public.phases(name,position,period,description) values
('Explorar',1,'Meses 1–2','Diagnose & base'),
('Desenvolver',2,'Meses 3–5','Capacitação intensiva'),
('Aplicar',3,'Meses 6–9','Imersão & prática'),
('Decolar',4,'Meses 10–12','Empregabilidade') on conflict do nothing;
insert into public.activities(phase,phase_index,title,prompt,criteria,position)
select items.phase,items.phase_index,items.title,'A definir com a Altius','["A definir com a Altius"]'::jsonb,items.position
from (values
('Explorar',0,'Assessment de perfil',1),('Explorar',0,'Fundamentos de TI',2),('Explorar',0,'Autoconhecimento',3),('Explorar',0,'Plano individual',4),
('Desenvolver',1,'Trilhas de hard skills',1),('Desenvolver',1,'Workshops de soft skills',2),('Desenvolver',1,'Projetos em grupo',3),('Desenvolver',1,'Mentoria quinzenal',4),
('Aplicar',2,'Projeto real em empresa',1),('Aplicar',2,'Hackathon interno',2),('Aplicar',2,'Simulação de entrevista',3),('Aplicar',2,'Portfólio técnico',4),
('Decolar',3,'LinkedIn & branding',1),('Decolar',3,'Conexão com parceiros',2),('Decolar',3,'Processo seletivo real',3),('Decolar',3,'Onboarding de carreira',4)
) as items(phase,phase_index,title,position)
where not exists(select 1 from public.activities a where a.phase=items.phase and a.title=items.title);

revoke execute on all functions in schema public from public, anon;
grant execute on function public.current_app_role() to authenticated;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.current_app_role() to authenticated;
grant execute on function public.is_admin() to authenticated;
