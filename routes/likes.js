/*
 * All routes for likes are defined here
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
  return router;
};
