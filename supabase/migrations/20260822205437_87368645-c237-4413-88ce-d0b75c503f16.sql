create table if not exists public.service_requests (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    email text not null,
    phone text,
    service_type text not null,
    business_name text,
    details text not null,
    budget text,
    status text not null default 'new',
    created_at timestamptz not null default now()
);

grant select, insert on public.service_requests to anon;
grant select, insert, update, delete on public.service_requests to authenticated;
grant all on public.service_requests to service_role;

alter table public.service_requests enable row level security;

create policy "Anyone can submit a service request"
on public.service_requests
for insert
to anon, authenticated
with check (true);

create policy "Authenticated users can view service requests"
on public.service_requests
for select
to authenticated
using (true);

create policy "Authenticated users can update service requests"
on public.service_requests
for update
to authenticated
using (true);

create policy "Authenticated users can delete service requests"
on public.service_requests
for delete
to authenticated
using (true);