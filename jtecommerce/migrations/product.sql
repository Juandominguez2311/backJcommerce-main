Create TABLE if not EXISTS categorias(
  categoriaId int(10) NOT NULL Primary Key,
  nombreCategoria TEXT NOT NULL
)


CREATE TABLE IF NOT EXISTS product (
  product_id SERIAL PRIMARY KEY,
  sku TEXT NOT NULL,
  name TEXT NOT NULL,
  type int(10) NOT NULL FOREIGN KEY REFERENCES categorias(categoriaId),
  quantity int(10) NOT NULL,
  description TEXT,
  image TEXT,
  price NUMERIC NOT NULL,

  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  deleted_at TIMESTAMP,
  active BOOLEAN DEFAULT true
);
alter table product add foreign key (category) references category (categoryId);



CREATE TABLE IF NOT EXISTS account (
  account_id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  active BOOLEAN DEFAULT false
);