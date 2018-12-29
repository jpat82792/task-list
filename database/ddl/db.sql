CREATE DATABASE task_list;
CREATE USER task_list_admin WITH PASSWORD 'tlIsBest21';
ALTER USER task_list_admin WITH SUPERUSER;
\c task_list;
CREATE EXTENSION pgcrypto;
