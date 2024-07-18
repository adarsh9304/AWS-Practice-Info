const AWS = require('aws-sdk');
const kms = new AWS.KMS();

async function encryptFile(fileData) {
  const params = {
    KeyId: 'your-cmk-id',
    KeySpec: 'AES_256'
  };
  const dataKey = await kms.generateDataKey(params).promise();
  const plainKey = dataKey.Plaintext;
  const encryptedKey = dataKey.CiphertextBlob;

  // Encrypt your file data using plainKey
  const encryptedData = yourEncryptionFunction(fileData, plainKey);

  return { encryptedData, encryptedKey };
}
