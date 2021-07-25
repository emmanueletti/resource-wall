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
    created_at,
    likes.user_id AS liked_id
  FROM resources
    JOIN likes ON resources.id = resource_id
  WHERE likes.user_id = $1
    OR resources.user_id = $1
    `,
      [user_id],
    )
      .then((data) => res.json(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });
  return router;
};
