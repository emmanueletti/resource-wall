/*
 * All routes for resources are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/search", (req, res) => {
    const { u } = req.query;
    db.query(
      "SELECT * FROM resources JOIN users ON users.id = user_id WHERE user_id = $1",
      [u]
    )
      .then((data) => res.json(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM resources WHERE resources.id = $1", [id])
      .then((data) => res.json(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });
  router.post("/", (req, res) => {
    const { user_id } = req.session;
    const { url, title, description } = req.body;
    db.query(
      "INSERT INTO resources (user_id, url, title, description) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, url, title, description]
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
