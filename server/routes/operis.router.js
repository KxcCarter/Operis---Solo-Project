const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  const user = req.user.id;
  const query = `SELECT * FROM projects WHERE projects.user_id = $1;`;

  pool
    .query(query, [user])
    .then((dbRes) => {
      console.log(dbRes.rows);
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log('ERROR in GET: ', err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  const user = req.user.id;
  const title = req.body.title;
  const description = req.body.description;
  const image = req.body.image;
  const notes = req.body.notes;
  const query = `INSERT INTO projects (user_id, title, description, image, notes) VALUES ($1, $2, $3, $4, $5);`;

  pool
    .query(query, [user, title, description, image, notes])
    .then((dbRes) => {
      console.log(dbRes);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('ERROR creating project: ', err);
      res.sendStatus(500);
    });
});

module.exports = router;
