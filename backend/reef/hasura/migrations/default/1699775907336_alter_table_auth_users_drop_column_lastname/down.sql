alter table "auth"."users" alter column "lastname" drop not null;
alter table "auth"."users" add column "lastname" text;
