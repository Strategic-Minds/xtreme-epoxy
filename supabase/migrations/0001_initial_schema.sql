create extension if not exists "pgcrypto";

create type lead_status as enum ('new', 'qualified', 'estimate_processing', 'estimate_sent', 'converted', 'lost');
create type estimate_status as enum ('draft', 'ai_reviewed', 'human_review_required', 'approved', 'sent', 'expired');
create type job_status as enum ('proposal_sent', 'signed', 'deposit_paid', 'scheduled', 'in_progress', 'completed', 'closed');
create type approval_status as enum ('pending', 'approved', 'rejected', 'needs_revision');
create type payment_status as enum ('pending', 'paid', 'failed', 'refunded', 'manual_review');
create type receipt_type as enum ('build', 'deploy', 'validation', 'owner_approval', 'estimate_sent', 'proposal_signed', 'payment_received', 'schedule_approved', 'job_completed', 'rollback');

create table locations (id uuid primary key default gen_random_uuid(), slug text unique not null, business_name text not null, city text not null, state text not null, phone text, email text, domain text, drive_folder_url text, repo_path text, vercel_project text, surrounding_cities text[] default '{}', status text default 'sandbox', created_at timestamptz default now(), updated_at timestamptz default now());
create table customers (id uuid primary key default gen_random_uuid(), location_id uuid references locations(id), full_name text not null, email text, phone text, address jsonb default '{}'::jsonb, created_at timestamptz default now(), updated_at timestamptz default now());
create table leads (id uuid primary key default gen_random_uuid(), location_id uuid references locations(id), customer_id uuid references customers(id), full_name text not null, email text not null, phone text not null, project_type text, square_footage text, timeline text, budget text, coupon_eligible boolean default false, lead_score text default 'cold', status lead_status default 'new', raw_payload jsonb default '{}'::jsonb, created_at timestamptz default now(), updated_at timestamptz default now());
create table lead_images (id uuid primary key default gen_random_uuid(), lead_id uuid references leads(id) on delete cascade, storage_bucket text not null, storage_path text not null, image_type text default 'existing_floor', original_filename text, mime_type text, ai_summary jsonb default '{}'::jsonb, created_at timestamptz default now());
create table estimates (id uuid primary key default gen_random_uuid(), lead_id uuid references leads(id), customer_id uuid references customers(id), status estimate_status default 'draft', ai_confidence text default 'low', human_review_required boolean default true, condition_summary text, subtotal numeric(12,2), coupon_discount numeric(12,2), total numeric(12,2), pricing_payload jsonb default '{}'::jsonb, created_at timestamptz default now(), updated_at timestamptz default now());
create table estimate_line_items (id uuid primary key default gen_random_uuid(), estimate_id uuid references estimates(id) on delete cascade, name text not null, quantity numeric(12,2), unit text, unit_price numeric(12,2), amount numeric(12,2), notes text, created_at timestamptz default now());
create table jobs (id uuid primary key default gen_random_uuid(), location_id uuid references locations(id), customer_id uuid references customers(id), estimate_id uuid references estimates(id), current_status job_status default 'proposal_sent', scheduled_start timestamptz, scheduled_end timestamptz, buffer_percent integer default 20, created_at timestamptz default now(), updated_at timestamptz default now());
create table job_timeline_events (id uuid primary key default gen_random_uuid(), job_id uuid references jobs(id) on delete cascade, event_key text not null, label text not null, owner_role text not null, status text default 'pending', visible_to_customer boolean default true, payload jsonb default '{}'::jsonb, created_at timestamptz default now());
create table proposals (id uuid primary key default gen_random_uuid(), job_id uuid references jobs(id), estimate_id uuid references estimates(id), status approval_status default 'pending', document_url text, signature_reference text, sent_at timestamptz, signed_at timestamptz, created_at timestamptz default now(), updated_at timestamptz default now());
create table payments (id uuid primary key default gen_random_uuid(), job_id uuid references jobs(id), payment_kind text not null, provider text default 'placeholder', provider_payment_id text, status payment_status default 'pending', amount numeric(12,2), paid_at timestamptz, created_at timestamptz default now(), updated_at timestamptz default now());
create table schedule_requests (id uuid primary key default gen_random_uuid(), job_id uuid references jobs(id), requested_start timestamptz, requested_end timestamptz, home_office_status approval_status default 'pending', customer_status approval_status default 'pending', google_calendar_event_id text, created_at timestamptz default now(), updated_at timestamptz default now());
create table change_orders (id uuid primary key default gen_random_uuid(), job_id uuid references jobs(id), reason text not null, description text, price_delta numeric(12,2), schedule_delta text, home_office_status approval_status default 'pending', customer_status approval_status default 'pending', signature_reference text, created_at timestamptz default now(), updated_at timestamptz default now());
create table color_approvals (id uuid primary key default gen_random_uuid(), job_id uuid references jobs(id), system_type text, selected_color text, sample_location text, photo_url text, status approval_status default 'pending', signature_reference text, created_at timestamptz default now(), updated_at timestamptz default now());
create table progress_photos (id uuid primary key default gen_random_uuid(), job_id uuid references jobs(id), storage_bucket text not null, storage_path text not null, stage text not null, visible_to_customer boolean default true, notes text, created_at timestamptz default now());
create table completion_forms (id uuid primary key default gen_random_uuid(), job_id uuid references jobs(id), status approval_status default 'pending', customer_notes text, crew_notes text, signature_reference text, completed_at timestamptz, created_at timestamptz default now(), updated_at timestamptz default now());
create table warranty_deliveries (id uuid primary key default gen_random_uuid(), job_id uuid references jobs(id), warranty_document_url text, care_document_url text, delivered_at timestamptz, review_link_sent boolean default false, created_at timestamptz default now());
create table automation_receipts (id uuid primary key default gen_random_uuid(), location_id uuid references locations(id), job_id uuid references jobs(id), receipt_type receipt_type not null, receipt_key text not null, payload jsonb default '{}'::jsonb, drive_file_url text, github_commit_sha text, created_at timestamptz default now());
create table audit_log (id uuid primary key default gen_random_uuid(), actor_role text not null, actor_id text, action text not null, entity_table text, entity_id uuid, payload jsonb default '{}'::jsonb, created_at timestamptz default now());

alter table locations enable row level security;
alter table customers enable row level security;
alter table leads enable row level security;
alter table lead_images enable row level security;
alter table estimates enable row level security;
alter table estimate_line_items enable row level security;
alter table jobs enable row level security;
alter table job_timeline_events enable row level security;
alter table proposals enable row level security;
alter table payments enable row level security;
alter table schedule_requests enable row level security;
alter table change_orders enable row level security;
alter table color_approvals enable row level security;
alter table progress_photos enable row level security;
alter table completion_forms enable row level security;
alter table warranty_deliveries enable row level security;
alter table automation_receipts enable row level security;
alter table audit_log enable row level security;

insert into locations (slug, business_name, city, state, phone, email, domain, drive_folder_url, repo_path, vercel_project, surrounding_cities)
values ('phoenix-epoxy-pros', 'Phoenix Epoxy Pros', 'Phoenix', 'AZ', '772-209-0266', 'hello@phoenixepoxypros.com', 'phoenixepoxypros.com', 'https://drive.google.com/drive/folders/1wdvro-T90CqXjcLtyACFXnlJ9vOqxuTk', 'apps/phoenix-epoxy-pros-site', 'phoenix-epoxy-pros', array['Scottsdale','Tempe','Mesa','Glendale','Peoria','Chandler','Gilbert','Surprise','Goodyear','Avondale','Paradise Valley'])
on conflict (slug) do nothing;
