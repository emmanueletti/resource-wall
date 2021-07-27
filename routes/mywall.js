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
SELECT resources.id AS res_id,
  resources.user_id AS auth_id,
  users.name AS auth_name,
  url,
  title,
  description,
  resources.created_at AS res_timestamp,
  round(avg(ratings.value), 2) AS avg_rating,
  COUNT(likes.id) AS likes,
  likes.user_id AS liked_id
FROM resources
  JOIN likes ON resources.id = likes.resource_id
  JOIN ratings ON ratings.resource_id = resources.id
  JOIN users ON users.id = resources.user_id
WHERE likes.user_id = $1
  OR resources.user_id = $1
GROUP BY resources.id,
  likes.user_id,
  users.name
`,
      [user_id],
    )
      .then((data) => res.json(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });
  return router;
};
