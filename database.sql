CREATE TABLE "users"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "projects"
(
    "id" SERIAL PRIMARY KEY,
    "user_id" int REFERENCES "users",
    "title" varchar(100) NOT NULL,
    "description" text,
    "image" varchar(150),
    "notes" text,
    "is_staffed" boolean DEFAULT false,
    "project_roles_id" int,
    "is_completed" boolean DEFAULT false
);

CREATE TABLE "roles"
(
    "id" SERIAL PRIMARY KEY,
    "role_name" varchar(50) NOT NULL
);

CREATE TABLE "talent"
(
    "id" SERIAL PRIMARY KEY,
    "name" varchar(40) NOT NULL,
    "contact_details" varchar(240),
    "primary_skills" varchar(240),
    "is_assigned" boolean DEFAULT false
);


CREATE TABLE "tasks"
(
    "id" SERIAL PRIMARY KEY,
    "project_id" int REFERENCES "projects",
    "description" text NOT NULL,
    "is_completed" boolean DEFAULT false
);

INSERT INTO projects
    (user_id, title, description, image, notes)
VALUES
    (1, 'Star Shrek', 'This time Shrek is in space.', 'https://i.pinimg.com/originals/5b/45/d1/5b45d12bec28d3a12820f850574d3d6d.jpg', 'Give this one the green light ASAP.'),
    (1, 'Han of the Dead', 'Zombies in space. What"s not to love?', 'https://i.pinimg.com/originals/9a/e0/d2/9ae0d2f16516de3dd6541100303570cd.jpg', 'George lucas has done it again.'),
    (1, 'Detergent', 'What makes you different makes you cleaner.', 'https://i.pinimg.com/originals/78/18/ed/7818ed01ed3897fc8a277a20566de2cf.jpg', 'The hottest trend in teen distopian drama.'),
    (2, 'Dumb and Dumbledore', 'You"re a wizard, Larry', 'https://i.pinimg.com/564x/f5/79/82/f5798240d9b6c98586cfdc732c5d9237.jpg', 'Smell the magic'),
    (3, 'When Dirty Harry Met Sally', 'Do ya feel lucky? Well do ya, punk??', 'https://i.pinimg.com/564x/d0/ec/6e/d0ec6e724dc3cd421f573dcf4fe3b3ed.jpg', 'We have run out of ideas' );


INSERT INTO talent
    (name)
VALUES
    ('Dale Gribble'),
    ('Vlad Dracul'),
    ('Elizabeth Bathory'),
    ('John Peoplesman'),
    ('Amy Stol'),
    ('Rusty Shackleford'),
    ('Tina Belcher'),
    ('Horacio Farnando'),
    ('Sally McPerson'),
    ('Andrea Johnson');

INSERT INTO roles
    (role_name)
VALUES
    ('Director'),
    ('Producer'),
    ('Writer'),
    ('Editor'),
    ('Composer'),
    ('Cinematographer'),
    ('Sound Editor'),
    ('Gaffer'),
    ('Casting Director');

INSERT INTO tasks
    (project_id, description)
VALUES
    (5, 'Compose the music'),
    (6, 'Write the movie.'),
    (6, 'Fire everyone currently involved and hire an entirely new production staff.'),
    (5, 'Shoot the movie.');

INSERT INTO tasks
    (project_id, description)
VALUES
    (1, 'Compose the music');





SELECT "projects".*, array_agg("tasks".description) AS tasks
from "projects"
    JOIN "tasks" ON "tasks".project_id = "projects".id
WHERE "projects".user_id = 3
GROUP BY "projects".id;

-- For Card
SELECT "projects".title, "projects".description, "projects".image, "projects".is_completed, "projects".is_staffed, array_agg("roles".role_name), array_agg("talent".name) AS talent, array_agg("tasks".description) AS tasks
from "projects"
    JOIN "tasks" ON "tasks".project_id = "projects".id
    JOIN "project_roles" ON "project_roles".project_id = "projects".id
    JOIN "talent" ON "talent".id = "project_roles".talent_id
    JOIN "roles" ON "roles".id = "project_roles".role_id
WHERE "projects".id = 1
GROUP BY "projects".id;


SELECT "talent".name, "projects".title, "roles".role_name
FROM "talent"
    JOIN "project_roles" ON "project_roles".talent_id = "talent".id
    JOIN "projects" ON "projects".id = "project_roles".project_id
    JOIN "roles" ON "roles".id = "project_roles".role_id
WHERE "projects".id = 1 AND "roles".role_name = 'Director';


-- For Project Details View
SELECT "projects".title, "projects".description, "projects".image, "projects".is_completed, "projects".is_staffed, array_agg("roles".role_name) AS roles, array_agg("talent".name) AS talent, array_agg("tasks".description) AS tasks
from "projects"
    LEFT JOIN "tasks" ON "tasks".project_id = "projects".id
    LEFT JOIN "project_roles" ON "project_roles".project_id = "projects".id
    LEFT JOIN "talent" ON "talent".id = "project_roles".talent_id
    LEFT JOIN "roles" ON "roles".id = "project_roles".role_id
WHERE "projects".id = 1
GROUP BY "projects".id;
















-- CREATE YOUR PLACEHOLDER DATA FIRST BEFORE CREATING JUCTION TABLES
-- Then you can create your junction tables 
-- Junction Tables

CREATE TABLE "project_roles"
(
    "id" SERIAL PRIMARY KEY,
    "project_id" int REFERENCES "projects",
    "role_id" int REFERENCES "roles",
    "talent_id" int REFERENCES "talent"
);

INSERT INTO project_roles
    (project_id, role_id, talent_id)
VALUES
    (2, 1, 5),
    (2, 2, 2),
    (2, 3, 3),
    (2, 4, 4);


-- Do I even need this table?
CREATE TABLE "users_projects"
(
    "id" SERIAL PRIMARY KEY,
    "project_id" int REFERENCES "projects",
    "user_id" int REFERENCES "users"
);

INSERT INTO users_projects
    (project_id, user_id)
VALUES
    (1, 1),
    (2, 1),
    (3, 1);

CREATE TABLE "projects_tasks"
(
    "id" SERIAL PRIMARY KEY,
    "project_id" int REFERENCES "projects",
    "task_id" int REFERENCES "tasks"
);

ALTER TABLE "talent" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "users_projects" ADD FOREIGN KEY ("username_id") REFERENCES "users" ("id");

ALTER TABLE "users_projects" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "project_roles" ADD FOREIGN KEY ("talent_id") REFERENCES "talent" ("id");

ALTER TABLE "project_roles" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "project_roles" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "project_tasks" ADD FOREIGN KEY ("project_id") REFERENCES "tasks" ("id");

