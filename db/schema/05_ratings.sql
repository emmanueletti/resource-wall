DROP TABLE IF EXISTS ratings CASCADE;
CREATE TABLE ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  value INT NOT NULL,
  UNIQUE (user_id, resource_id)
);
