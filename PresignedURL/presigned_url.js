const AWS = require('aws-sdk');

/*
AWS.config.update({
    accessKeyId: 'ACCESS_KEY_ID',
    secretAccessKey: 'SECRET_ACCESS_KEY',
    region: 'us-west-1', // or the region you want to use
    s3ForcePathStyle: true,
    endpoint: 'http://localhost:4566' // LocalStack endpoint
});

*/

const s3 = new AWS.S3();

const params = {
    Bucket: 'first-bucket', 
    Key: 'object1'
};

const url = s3.getSignedUrl('getObject', params);
console.log('Pre-signed URL:', url);
