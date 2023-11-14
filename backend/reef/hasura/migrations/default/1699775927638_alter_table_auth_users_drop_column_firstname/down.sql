alter table "auth"."users" alter column "firstname" drop not null;
alter table "auth"."users" add column "firstname" text;
