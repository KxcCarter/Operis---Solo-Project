const fs = require('fs');
const AWS = require('aws-sdk');

const BUCKET_NAME = 'operisstorage';
const ID = 'AKIAUR5YYQYJE5EXXXO4';
const SECRET = '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';

// The name of the bucket that you have created

// Set the region
AWS.config.update({ region: 'REGION' });

// Create S3 service object
s3 = new AWS.S3();

// call S3 to retrieve upload file to specified bucket
var uploadParams = { Bucket: 'operisstorage', Key: '', Body: '' };
var file = process.argv[3];

// Configure the file stream and obtain the upload parameters
var fileStream = fs.createReadStream(file);
fileStream.on('error', function (err) {
  console.log('File Error', err);
});
uploadParams.Body = fileStream;
uploadParams.Key = file;

// call S3 to retrieve upload file to specified bucket
s3.upload(uploadParams, (err, data) => {
  if (err) {
    console.log('Error', err);
  }
  if (data) {
    console.log('Upload Success', data.Location);
  }
});
