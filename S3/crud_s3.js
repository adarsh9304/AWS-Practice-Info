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


function createBucket(bucketName) {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: bucketName
        };
        s3.createBucket(params, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

function listBuckets() {
    return new Promise((resolve, reject) => {
        s3.listBuckets((err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

function putObjectInBucket(){
    const bucketName = 'first-bucket';
const objectKey = 'object1'; 
const objectContent = 'Hello programmers'; 

s3.putObject({
    Bucket: bucketName,
    Key: objectKey,
    Body: objectContent
}, (err, data) => {
    if (err) {
        console.error('Error uploading object:', err);
    } else {
        console.log('Object uploaded successfully:', data);
    }
});
}

function deleteBucket(bucketName) {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: bucketName
        };
        s3.deleteBucket(params, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}
function listObjects() {
    const bucketName = 'first-bucket';
    const params = {
        Bucket: bucketName
    };

    s3.listObjectsV2(params, (err, data) => {
        if (err) {
            console.error('Error listing objects:', err);
        } else {
            console.log('Objects in the bucket:', data.Contents);
        }
    });
}
async function main() {
    try {
        
        await createBucket('second-bucket');
        
        // putObjectInBucket();
        // listObjects()
      
        const buckets = await listBuckets();
        console.log('Buckets:', buckets.Buckets);

     
        // await deleteBucket('first-bucket');
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
