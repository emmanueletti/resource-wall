/*
 * All routes for comments are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/search", (req, res) => {
    const res_id = req.query.res;
    db.query(
      `
SELECT comments.id AS id,
  comments.user_id AS user_id,
  comments.resource_id AS resource_id,
  comments.content AS content,
  comments.created_at AS created_at,
  users.name AS user_name
FROM comments
  JOIN users ON users.id = comments.user_id
WHERE resource_id = $1`,
      [res_id]
    )
      .then((data) => res.json(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });
  router.post("/", (req, res) => {
    const { user_id } = req.session;
    const { resource_id, content } = req.body;
    db.query(
      "INSERT INTO comments (user_id, resource_id, content) VALUES ($1, $2, $3) RETURNING id",
      [user_id, resource_id, content]
    )
      .then((data) =>
        db.query(
          `
SELECT comments.id,
  comments.user_id,
  comments.resource_id,
  comments.content,
  comments.created_at,
  users.name AS user_name
FROM comments
  JOIN users ON user_id = users.id
WHERE comments.id = $1
    `,
          [data.rows[0].id]
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
