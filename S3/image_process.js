const AWS = require('aws-sdk');

const ec2 = new AWS.EC2({
    endpoint: 'http://localhost:4566', // LocalStack endpoint
    accessKeyId: 'YOUR_ACCESS_KEY_ID', // LocalStack access key
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY', // LocalStack secret key
    region: 'us-east-1', // Any region can be used with LocalStack
  });
  