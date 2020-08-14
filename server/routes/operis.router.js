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
      console.log('ERROR in GET all projects: ', err);
      res.sendStatus(500);
    });
});

//
// GET all roles
router.get('/roles', rejectUnauthenticated, (req, res) => {
  const query = `SELECT * FROM "roles";`;
  pool
    .query(query)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log('Error GETTING Roles: ', err);
      res.sendStatus(500);
    });
});

// GET a single project
router.get('/project/:id', rejectUnauthenticated, (req, res) => {
  const projectID = req.params.id;

  const query = `SELECT "projects".*, array_agg(DISTINCT "roles".role_name) AS roles, 
                  array_agg(DISTINCT "talent".name) AS talent from "projects"
                  LEFT JOIN "project_roles" ON "project_roles".project_id = "projects".id
                  LEFT JOIN "talent" ON "talent".id = "project_roles".talent_id
                  LEFT JOIN "roles" ON "roles".id = "project_roles".role_id
                  WHERE "projects".id = $1
                  GROUP BY "projects".id;`;

  pool
    .query(query, [projectID])
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log('ERROR in GET: ', err);
      res.sendStatus(500);
    });
});

//
// GET tasks belonging to a project
router.get('/tasks/:id', rejectUnauthenticated, (req, res) => {
  const projectID = req.params.id;
  const query = `SELECT * FROM tasks WHERE "tasks".project_id = $1;`;

  pool
    .query(query, [projectID])
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log('Error GETTING project tasks: ', err);
      res.sendStatus(500);
    });
});

//
// GET crew + roles belonging to a project
router.get('/crewProject/:id', rejectUnauthenticated, (req, res) => {
  const projectID = req.params.id;
  const query = `SELECT "talent".name, "projects".title, "roles".role_name FROM "talent"
              LEFT JOIN "project_roles" ON "project_roles".talent_id = "talent".id
              LEFT JOIN "projects" ON "projects".id = "project_roles".project_id
              LEFT JOIN "roles" ON "roles".id = "project_roles".role_id
              WHERE "projects".id = $1`;

  pool
    .query(query, [projectID])
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log('Error GETTING project Crew and Roles: ', err);
      res.sendStatus(500);
    });
});

//
// GET all talent belonging to a user
router.get('/talentPool/:id', rejectUnauthenticated, (req, res) => {
  const user = req.user.id;
  const query = `SELECT * FROM "talent" WHERE "talent".belongs_to_user = $1;`;

  pool
    .query(query, [user])
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log('Error GETTING User Talent Pool: ', err);
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

//
// POST new task
router.post('/newTask', (req, res) => {
  const task = req.body.task;
  const id = req.body.id;

  const query = `INSERT INTO tasks (project_id, description)
                VALUES ($2, $1);`;
  pool
    .query(query, [task, id])
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Error POSTing new note: ', err);
      res.sendStatus(500);
    });
});

// PUT
// PUT update note
router.put('/updateNote/:id', (req, res) => {
  const note = req.body.note;
  const id = req.params.id;
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
      console.log('ERROR with PUT for note: ', err);
      res.sendStatus(500);
    });
});

//
// PUT update task
router.put('/updateTask/:id', (req, res) => {
  const note = req.body.task;
  const id = req.params.id;
  const query = `UPDATE "tasks"
                  SET description = $1
                  WHERE "tasks".id = $2`;
  pool
    .query(query, [note, id])
    .then((dbRes) => {
      console.log('Update task dbRes: ', dbRes);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('ERROR with PUT for task: ', err);
      res.sendStatus(500);
    });
});

module.exports = router;
