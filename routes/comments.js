/*
 * All routes for comments are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/search", (req, res) => {
    const res_id = req.query.res;
    db.query("SELECT * FROM comments WHERE resource_id = $1", [res_id])
      .then((data) => res.json(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });
  router.post("/", (req, res) => {
    const { user_id } = req.session;
    const { resource_id, content } = req.body;
    db.query(
      "INSERT INTO comments (user_id, resource_id, content) VALUES ($1, $2, $3) RETURNING *",
      [user_id, resource_id, content]
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
