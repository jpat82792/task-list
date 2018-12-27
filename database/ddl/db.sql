CREATE USER task_list_admin WITH PASSWORD 'tlIsBest21';
ALTER USER task_list_admin WITH SUPERUSER;

CREATE EXTENSION pgcrypto;
