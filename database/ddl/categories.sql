CREATE TABLE categories
(
  category_id BIGSERIAL,
	user_id BIGINT REFERENCES users(user_id),
	category VARCHAR(100) NOT NULL UNIQUE
);

ALTER TABLE categories OWNER to task_list_admin;

INSERT INTO CATEGORIES (user_id, category) VALUES (1, 'cat1');
INSERT INTO CATEGORIES (user_id, category) VALUES (1, 'cat2');
INSERT INTO CATEGORIES (user_id, category) VALUES (1, 'cat3');