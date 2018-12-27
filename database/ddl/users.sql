CREATE TABLE users (
  username VARCHAR(30) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(35) DEFAULT NULL,
  last_name VARCHAR(35) DEFAULT NULL,
  password VARCHAR(30) NOT NULL,
  user_id BIGSERIAL PRIMARY KEY
);
