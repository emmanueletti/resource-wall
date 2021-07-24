DROP TABLE IF EXISTS categories_resources CASCADE;
CREATE TABLE categories_resources (
  id SERIAL PRIMARY KEY NOT NULL,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  resource_id INTEGER NOT NULL REFERENCES resources(id) ON DELETE CASCADE
);
