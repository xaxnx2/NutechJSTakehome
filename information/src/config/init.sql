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
