const { S3Client, GetObjectCommand , PutObjectCommand} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

/*
const s3client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: 'ACCESS_KEY_ID',
        secretAccessKey: 'SECRET_ACCESS_KEY',
    }
});
*/

async function getObjectURL(key) {
    const command = new GetObjectCommand({
        Bucket: "bucketcreatedbyyoutubeuser",
        Key: key
    });
    const url = await getSignedUrl(s3client, command);
    return url;
}

async function putObject(fileName,contentType){
     const command=new PutObjectCommand({
        Bucket:'bucketcreatedbyyoutubeuser',
        key:`/uploads/user-uploads/${fileName}`,
        ContentType:contentType
     })
}

async function main() {
    try {
        console.log('URL for the image is:', await getObjectURL('nest_typeorm.png'));
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
