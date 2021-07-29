/*
 * All routes for resources are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `
    SELECT resources.id AS res_id,
      users.id AS auth_id,
      users.name AS auth_name,
      resources.url AS url,
      resources.title AS title,
      resources.description AS description,
      resources.created_at AS res_timestamp,
      round(avg(ratings.value), 2) AS avg_rating,
      COUNT(DISTINCT likes.id) AS likes
    FROM resources
      LEFT JOIN users ON users.id = resources.user_id
      LEFT JOIN ratings ON resources.id = ratings.resource_id
      LEFT JOIN likes ON resources.id = likes.resource_id
    GROUP BY resources.id,
      users.id
    `
    )
      .then((data) => res.json(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });
  router.get("/search", (req, res) => {
    const { u } = req.query;
    db.query(
      `
    SELECT resources.id AS res_id,
      users.id AS auth_id,
      users.name AS auth_name,
      resources.url AS url,
      resources.title AS title,
      resources.description AS description,
      resources.created_at AS res_timestamp,
      round(avg(ratings.value), 2) AS avg_rating,
      COUNT(DISTINCT likes.id) AS likes
    FROM resources
      LEFT JOIN users ON users.id = resources.user_id
      LEFT JOIN ratings ON resources.id = ratings.resource_id
      LEFT JOIN likes ON resources.id = likes.resource_id
    WHERE LOWER(users.name) LIKE $1
    GROUP BY resources.id,
      users.id`,
      [`%${u.toLowerCase()}%`]
    )
      .then((data) => res.json(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query(
      `
      SELECT resources.id AS res_id,
      users.id AS auth_id,
      users.name AS auth_name,
      resources.url AS url,
      resources.title AS title,
      resources.description AS description,
      resources.created_at AS res_timestamp,
      round(avg(ratings.value), 2) AS avg_rating,
      COUNT(DISTINCT likes.id) AS likes
    FROM resources
      LEFT JOIN users ON users.id = resources.user_id
      LEFT JOIN ratings ON resources.id = ratings.resource_id
      LEFT JOIN likes ON resources.id = likes.resource_id
    WHERE resources.id = $1
    GROUP BY resources.id,
      users.id
    `,
      [id]
    )
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
