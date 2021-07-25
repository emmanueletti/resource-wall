/*
 * All routes for categories are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
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
  return router;
};