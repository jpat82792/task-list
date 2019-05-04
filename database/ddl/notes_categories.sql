CREATE TABLE  notes_categories (
user_id BIGSERIAL NOT NULL REFERENCES users(user_id)  ON DELETE CASCADE, 
note_id BIGSERIAL NOT NULL REFERENCES notes(note_id)  ON DELETE CASCADE, 
category_id BIGSERIAL NOT NULL REFERENCES categories(category_id) ON DELETE CASCADE,
note_category_id BIGSERIAL,
PRIMARY KEY (user_id, note_id, category_id, note_category_id)
);