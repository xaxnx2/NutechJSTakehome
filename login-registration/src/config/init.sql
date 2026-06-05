CREATE TABLE USERS (
  id SERIAL PRIMARY KEY ,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  email varchar(255) unique NOT NULL,
  password varchar(255) NOT NULL,
  profile_image TEXT DEFAULT 'https://yoururlapi.com/default-profile.jpeg',
  created_at timestamp default NOW(),
  updated_at timestamp default NOW(),
  deleted_at timestamp
);