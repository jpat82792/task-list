CREATE TABLE  notes_categories (
user_id BIGSERIAL NOT NULL REFERENCES users(user_id)  ON DELETE CASCADE, 
note_id BIGSERIAL NOT NULL REFERENCES notes(note_id)  ON DELETE CASCADE, 
category_id BIGSERIAL NOT NULL REFERENCES categories(category_id) ON DELETE CASCADE,
PRIMARY KEY (user_id, note_id, category_id)
);