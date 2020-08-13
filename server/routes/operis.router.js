const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

/**
 * GET route template
 */

// GET all projects by user
router.get('/', rejectUnauthenticated, (req, res) => {
  const user = req.user.id;
  const query = `SELECT * FROM projects WHERE projects.user_id = $1;`;

  pool
    .query(query, [user])
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log('ERROR in GET: ', err);
      res.sendStatus(500);
    });
});

// GET a single project
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const projectID = req.params.id;
  const query = `SELECT "projects".*, array_agg(DISTINCT "roles".role_name) AS roles, 
              array_agg(DISTINCT "talent".name) AS talent, array_agg(DISTINCT "tasks".id) AS taskID, 
              array_agg(DISTINCT "tasks".description) AS tasks from "projects"
              LEFT JOIN "tasks" ON "tasks".project_id = "projects".id
              LEFT JOIN "project_roles" ON "project_roles".project_id = "projects".id
              LEFT JOIN "talent" ON "talent".id = "project_roles".talent_id
              LEFT JOIN "roles" ON "roles".id = "project_roles".role_id
              WHERE "projects".id = $1
              GROUP BY "projects".id;`;

  pool
    .query(query, [projectID])
    .then((dbRes) => {
      // console.log(dbRes.rows);
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
  const query = `INSERT INTO projects (user_id, title, description, image) VALUES ($1, $2, $3, $4);`;

  pool
    .query(query, [user, title, description, image])
    .then((dbRes) => {
      console.log(dbRes);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('ERROR creating project: ', err);
      res.sendStatus(500);
    });
});

// PUT
// PUT update note
router.put('/update/:id', (req, res) => {
  const note = req.body.note;
  console.log('req.body.note:', req.body.note);
  const id = req.params.id;
  console.log('params: ', req.params.id);
  // const user = req.user.id;

  const query = `UPDATE "projects"
                  SET notes = $1
                  WHERE "projects".id = $2`;

  pool
    .query(query, [note, id])
    .then((dbRes) => {
      console.log('Update note dbRes: ', dbRes);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('ERROR with PUT: ', err);
      res.sendStatus(500);
    });
});

module.exports = router;
