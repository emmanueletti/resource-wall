/*
 * All routes for categories are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const { user_id } = req.session;
    db.query("SELECT id, user_id, name FROM categories WHERE user_id = $1", [
      user_id,
    ])
      .then((data) => res.json(data.rows))
      .catch((err) => res.status(500).json({ error: err.message }));
  });
  router.get("/search", (req, res) => {
    const res_id = req.query.res;
    const { user_id } = req.session;
    db.query(
      `
SELECT categories.id,
  categories.user_id,
  categories.name,
  resources.id AS res_id
FROM categories
  JOIN categories_resources ON categories.id = category_id
  JOIN resources ON resource_id = resources.id
WHERE resources.id = $1 and categories.user_id = $2
      `,
      [res_id, user_id]
    )
      .then((data) => res.json(data.rows))
      .catch((err) => res.status(500).json({ error: err.message }));
  });
  router.post("/", (req, res) => {
    const { user_id } = req.session;
    const { name } = req.body;
    db.query(
      "INSERT INTO categories (user_id, name) VALUES ($1, $2) RETURNING *",
      [user_id, name]
    )
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.delete("/", (req, res) => {
    const { user_id } = req.session;
    const { id } = req.body;
    db.query("DELETE FROM categories WHERE user_id = $1 AND id = $2", [
      user_id,
      id,
    ])
      .then(() => res.status(204).end())
      .catch((e) => res.status(500).json({ error: e.message }));
  });
  return router;
};
