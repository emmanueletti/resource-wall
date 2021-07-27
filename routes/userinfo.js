/*
 * All routes for userinfo are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const { user_id } = req.session;
    db.query(
      "SELECT users.id AS id, users.name AS name FROM users WHERE users.id = $1",
      [user_id]
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
