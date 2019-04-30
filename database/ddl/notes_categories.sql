CREATE TABLE  notes_categories (
user_id BIGSERIAL NOT NULL REFERENCES users(user_id), 
note_id BIGSERIAL NOT NULL REFERENCES notes(note_id), 
category_id BIGSERIAL NOT NULL REFERENCES categories(category_id),
PRIMARY KEY (user_id, note_id, category_id)
);