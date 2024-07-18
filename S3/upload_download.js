const fs = require('fs');
const path = require('path'); 
const AWS = require('aws-sdk');

AWS.config.update({
    endpoint: 'http://localhost:4566', 
    accessKeyId: 'YOUR_ACCESS_KEY_ID',
    s3ForcePathStyle: true,
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
    region: 'us-east-1' 
});

const s3 = new AWS.S3();

function uploadFile(bucketName, fileName) {
    const filePath = path.join(__dirname, fileName); 
    const fileContent = fs.readFileSync(filePath);

    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: fileContent
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.error('Error uploading file:', err);
        } else {
            console.log('File uploaded successfully:', data.Location);
        }
    });
}

function downloadFile(bucketName, fileName) {
    const params = {
        Bucket: bucketName,
        Key: fileName
    };

    const localFilePath = path.join(__dirname, fileName); 

    const file = fs.createWriteStream(localFilePath);

    s3.getObject(params)
        .createReadStream()
        .pipe(file)
        .on('error', (err) => {
            console.error('Error downloading file:', err);
        })
        .on('close', () => {
            console.log('File downloaded successfully:', localFilePath);
        });
}

const bucketName = 'second-bucket';
const fileName = 'file_upload.jpg';

uploadFile(bucketName, fileName);

// downloadFile(bucketName, fileName);

