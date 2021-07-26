/*
 * All routes for category-resource connections are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
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
