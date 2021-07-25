/*
 * All routes for access control are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/login/:id", (req, res) => {
    const { id } = req.params;
    db.query(`SELECT * FROM users WHERE id = ${id};`)
      .then(() => {
        req.session.user_id = id;
        res.redirect("/");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
