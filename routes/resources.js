/*
 * All routes for resources are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/search", (req, res) => {
    const { u } = req.query;
    db.query(
      `
    SELECT m.res_id,
      m.auth_id,
      m.auth_name,
      m.url,
      m.title,
      m.description,
      m.res_timestamp,
      r.avg_rating,
      l.likes
    FROM (
        SELECT resources.id AS res_id,
          users.id AS auth_id,
          users.name AS auth_name,
          resources.url AS url,
          resources.title AS title,
          resources.description AS description,
          resources.created_at AS res_timestamp
        FROM resources
          JOIN users ON users.id = resources.user_id
        WHERE LOWER(users.name) LIKE $1::varchar
      ) m
      JOIN (
        SELECT resources.id AS res_id,
          COUNT(likes.id) AS likes
        FROM resources
          LEFT JOIN likes ON resources.id = likes.resource_id
        GROUP BY resources.id
      ) l ON m.res_id = l.res_id
      JOIN (
        SELECT round(avg(value), 2) AS avg_rating,
          resources.id AS res_id
        FROM resources
          LEFT JOIN ratings ON resources.id = ratings.resource_id
        GROUP BY resources.id
      ) r ON m.res_id = r.res_id;`,
      [`%${u.toLowerCase()}%`]
    )
      .then((data) => res.json(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query(
      `
    SELECT m.res_id,
      m.auth_id,
      m.auth_name,
      m.url,
      m.title,
      m.description,
      m.res_timestamp,
      r.avg_rating,
      l.likes
    FROM (
        SELECT resources.id AS res_id,
          users.id AS auth_id,
          users.name AS auth_name,
          resources.url AS url,
          resources.title AS title,
          resources.description AS description,
          resources.created_at AS res_timestamp
        FROM resources
          JOIN users ON resources.user_id = users.id
        WHERE resources.id = $1
      ) m,
      (
        SELECT COUNT(id) AS likes
        FROM likes
        WHERE resource_id = $1
      ) l,
      (
        SELECT round(avg(value), 2) AS avg_rating
        FROM ratings
        WHERE resource_id = $1
      ) r;
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
