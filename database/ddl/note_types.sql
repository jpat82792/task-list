CREATE TABLE note_types
(
	classification VARCHAR(30) PRIMARY KEY
);

ALTER TABLE note_types OWNER TO task_list_admin;

INSERT INTO note_types (classification) values ('list');
INSERT INTO note_types (classification) values ('general');