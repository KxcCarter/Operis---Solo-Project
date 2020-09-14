const express = require('express');
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
  console.log('Here is the key: ', req.params.key);
  deleteObject(req.params.key);
});

module.exports = router;
