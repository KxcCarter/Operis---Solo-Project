const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

const s3Router = require('./routes/s3.router');

// Route includes
const userRouter = require('./routes/user.router');
const operisRouter = require('./routes/operis.router');

const UploaderS3Router = require('react-dropzone-s3-uploader/s3router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/operis', operisRouter);

app.use(
  '/s3',
  UploaderS3Router({
    bucket: 'operisstorage', // required
    region: 'us-east-2', // optional
    headers: { 'Access-Control-Allow-Origin': '*' }, // optional
    ACL: 'public-read', // private is the default - set to `public-read` to let anyone view uploads
    uniquePrefix: false, // true is the default
  })
);

// const deleteAFile = async () => {
//   const result = await s3
//     .deleteObject({
//       Bucket: 'operisstorage',
//       Key: req.params.key,
//     })
//     .promise(() => {
//       console.log('hey whats up?');
//     });
// };

app.use('/deleteS3Image', s3Router);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
