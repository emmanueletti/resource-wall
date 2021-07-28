/*
 * All routes for mywall are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const { user_id } = req.session;
    db.query(
      `
    SELECT r1.id AS res_id,
      u1.id AS auth_id,
      u1.name AS auth_name,
      r1.url AS url,
      r1.title AS title,
      r1.description AS description,
      r1.created_at AS res_timestamp
    FROM users u1
      JOIN resources r1 ON u1.id = r1.user_id
    WHERE u1.id = $1
    UNION
    SELECT r2.id AS res_id,
      u2.id AS auth_id,
      u2.name AS auth_name,
      r2.url AS url,
      r2.title AS title,
      r2.description AS description,
      r2.created_at AS res_timestamp
    FROM likes l
      JOIN users u2 ON l.user_id = u2.id
      JOIN resources r2 ON l.resource_id = r2.id
    WHERE l.user_id = $1
`,
      [user_id]
    )
      .then((data) => res.json(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });
  return router;
};
