/*
 * All routes for category-resource connections are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/search", (req, res) => {
    const { user_id } = req.session;
    const { cat } = req.query;
    db.query(
      `
SELECT categories_resources.id,
  category_id,
  resource_id,
  user_id
FROM categories_resources
  JOIN categories ON category_id = categories.id
WHERE category_id = $1
  AND user_id = $2`,
      [cat, user_id]
    )
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.post("/", (req, res) => {
    const { category_id, resource_id } = req.body;
    db.query(
      "INSERT INTO categories_resources (category_id, resource_id) VALUES ($1, $2) RETURNING *",
      [category_id, resource_id]
    )
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
