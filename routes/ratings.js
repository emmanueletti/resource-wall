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
      "INSERT INTO ratings (user_id, resource_id, value) VALUES ($1, $2, $3)",
      [user_id, resource_id, value]
    )
      .then(() =>
        db.query(
          "SELECT id, user_id, resource_id, value FROM ratings WHERE resource_id = $1",
          [resource_id]
        )
      )
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.put("/", (req, res) => {
    const { user_id } = req.session;
    const { resource_id, value } = req.body;
    db.query(
      `
UPDATE ratings
SET value = $3
WHERE user_id = $1
  AND resource_id = $2
`,
      [user_id, resource_id, value]
    )
      .then(() =>
        db.query(
          "SELECT id, user_id, resource_id, value FROM ratings WHERE resource_id = $1",
          [resource_id]
        )
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
