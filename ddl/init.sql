CREATE TABLE BANNERS (
  id SERIAL PRIMARY KEY ,
  banner_name varchar(255) NOT NULL,
  banner_image TEXT DEFAULT 'https://nutech-integrasi.app/dummy.jpg',
  description TEXT DEFAULT 'Lerem Ipsum Dolor sit amet',
  created_at timestamp default NOW(),
  updated_at timestamp default NOW(),
  deleted_at timestamp
);

CREATE TABLE SERVICES (
  id SERIAL PRIMARY KEY ,
  service_code varchar(255) NOT NULL,
  service_name varchar(255) NOT NULL,
  service_icon TEXT DEFAULT 'https://nutech-integrasi.app/dummy.jpg',
  service_tariff int,
  created_at timestamp default NOW(),
  updated_at timestamp default NOW(),
  deleted_at timestamp
);

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

CREATE TABLE BALANCE (
  id SERIAL PRIMARY KEY ,
  id_user int NOT NULL,
  balance int NOT NULL,
  created_at timestamp default NOW(),
  updated_at timestamp default NOW(),
  deleted_at timestamp
);

CREATE TABLE TRANSACTION (
  id SERIAL PRIMARY KEY ,
  id_user int NOT NULL,
  invoice_number varchar(255) NOT NULL,
  service_code varchar(255) NOT NULL,
  service_name varchar(255) NOT NULL,
  transaction_type varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  total_amount int NOT NULL,
  created_at timestamp default NOW(),
  updated_at timestamp default NOW(),
  deleted_at timestamp
);