/*
 * All routes for likes are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const { user_id } = req.session;
    const { resource_id } = req.body;
    db.query(
      "INSERT INTO likes (user_id, resource_id) VALUES ($1, $2) returning *",
      [user_id, resource_id],
    )
      .then((data) => {
        res.json(data.rows);
      })
      .catch((e) => {
        res.status(500).json({ error: e.message });
      });
  });
  router.get("/search", (req, res) => {
    const { u } = req.query;
    db.query(
      `SELECT resources.id AS res_id,
url,
title,
description,
created_at,
likes.user_id AS user_id
FROM resources
JOIN likes ON resources.id = resource_id
WHERE likes.user_id = $1;
`,
      [u],
    )
      .then((data) => res.json(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });
  return router;
};