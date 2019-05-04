CREATE TABLE notes
(
	user_id BIGINT REFERENCES users(user_id),
	title VARCHAR(300),
	type VARCHAR(30) REFERENCES note_types(classification),
	body TEXT,
	note_id BIGSERIAL PRIMARY KEY UNIQUE 
);

ALTER TABLE notes OWNER TO task_list_admin;