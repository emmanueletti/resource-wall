/*
 * All routes for ratings are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const { user_id } = req.session;
    const { resource_id, value } = req.body;
    db.query(
      "INSERT INTO ratings (user_id, resource_id, value) VALUES ($1, $2, $3) RETURNING *",
      [user_id, resource_id, value]
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
