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
      url,
      title,
      description,
      resources.created_at AS res_timestamp,
      round(avg(ratings.value), 2) AS avg_rating,
      likes.user_id AS liked_id
    FROM resources
      JOIN likes ON resources.id = likes.resource_id
      JOIN ratings ON ratings.resource_id = resources.id
    WHERE likes.user_id = $1
      OR resources.user_id = $1
    GROUP BY resources.id,
      likes.user_id`,
      [user_id],
    )
      .then((data) => res.json(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });
  return router;
};
