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