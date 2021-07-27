/*
 * All routes for userinfo are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const { user_id } = req.session;
    db.query(
      `
SELECT u.name AS name,
u.id AS id,
r.res AS resources,
l.lks AS likes
FROM (
  SELECT COUNT(id) AS res
  FROM resources
  WHERE user_id = $1
) r,
(
  SELECT COUNT(id) AS lks
  FROM likes
  WHERE user_id = $1
) l,
(
  SELECT id,
    name
  FROM users
  WHERE id = $1
) u;`,
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
