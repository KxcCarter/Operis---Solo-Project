const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();
const moment = require('moment');

/**
 * GET route template
 */

// GET all projects by user
router.get('/', rejectUnauthenticated, (req, res) => {
  const user = req.user.id;
  const query = `SELECT * FROM projects WHERE projects.user_id = $1 ORDER BY id ASC;`;

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
router.get('/tasks', rejectUnauthenticated, (req, res) => {
  const projectID = req.query.id;
  const orderBy = req.query.orderBy;
  console.log(req.query);
  const query = `SELECT * FROM tasks WHERE "tasks".project_id = $1 ORDER BY ${orderBy};`;

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
  const query = `SELECT "project_roles".project_id, "project_roles".id, "talent".name, 
              "roles".role_name FROM "project_roles"
              LEFT JOIN "talent" ON "talent".id = "project_roles".talent_id
              LEFT JOIN "roles" ON "roles".id = "project_roles".role_id
              WHERE "project_roles".project_id = $1;`;

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

//
// Create New Project
router.post('/', (req, res) => {
  const user = req.user.id;
  const title = req.body.title;
  const description = req.body.description;
  const image = req.body.image;
  let timeCreated = moment().format('YYYY-MM-DD h:mm:ss');
  const query = `INSERT INTO projects (user_id, title, description, image, time_created) VALUES ($1, $2, $3, $4, $5);`;

  pool
    .query(query, [user, title, description, image, timeCreated])
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
  let timeCreated = moment().format('YYYY-MM-DD h:mm:ss');
  const query = `INSERT INTO tasks (project_id, description, time_created)
                VALUES ($1, $2, $3);`;
  pool
    .query(query, [id, task, timeCreated])
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Error POSTing new note: ', err);
      res.sendStatus(500);
    });
});

//
// POST new role to project
router.post('/addProjectRole/:id', (req, res) => {
  const projectID = req.params.id;
  const roleID = req.body.roleID;
  console.log(req.body);
  const query = `INSERT INTO project_roles (project_id, role_id)
  VALUES ($1, $2);`;

  pool
    .query(query, [projectID, roleID])
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('ERROR POSTing new Role to project: ', err);
      res.sendStatus(500);
    });
});

//
//
// THIS IS JUST A TEST TEMPLATE. IT NEEDS TO RECIEVE A PROJECT ID
router.put('/uploadImage', (req, res) => {
  const pID = 15;
  const image = req.body.image;
  console.log(req.body);
  const query = `UPDATE "projects" SET image = $2 WHERE "projects".id = $1;`;

  pool
    .query(query, [pID, image])
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Error PUTTING image url: ', err);
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

//
// PUT talent on a role
router.put('/setTalentRole/:id', (req, res) => {
  const talentID = req.body.talentID;
  const id = req.params.id;
  console.log(req.body.talentID, req.params.id);
  const query = `UPDATE project_roles SET talent_id = $1 WHERE id = $2;`;

  pool
    .query(query, [talentID, id])
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Error PUTTING talent on project role: ', err);
    });
});

module.exports = router;
