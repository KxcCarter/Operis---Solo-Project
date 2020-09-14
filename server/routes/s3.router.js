const express = require('express');
// const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

const AWS = require('aws-sdk');
var s3 = new AWS.S3();

const deleteObject = async (keyName) => {
  const result = await s3
    .deleteObject({
      Bucket: 'operisstorage',
      Key: keyName,
    })
    .promise(() => {
      console.log('hey whats up?');
    });
};

router.delete('/:key', rejectUnauthenticated, (req, res) => {
  console.log('in s3 router.');
  //   s3.deleteObject({
  //     Bucket: 'operisstorage',
  //     Key: req.params.key,
  //   })
  //     .then((res) => {
  //       console.log('delete request has been sent to s3');
  //       res.send(200);
  //     })
  //     .catch((err) => {
  //       console.log('That didnt work. ', err);
  //       res.sendStatus(500);
  //     });
  console.log('Here is the key: ', req.params.key);
  deleteObject(req.params.key);
});

module.exports = router;
