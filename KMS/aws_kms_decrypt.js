async function decryptFile(encryptedData, encryptedKey) {
    const params = {
      CiphertextBlob: encryptedKey
    };
    const data = await kms.decrypt(params).promise();
    const plainKey = data.Plaintext;
  
    // Decrypt your file data using plainKey
    const decryptedData = yourDecryptionFunction(encryptedData, plainKey);
  
    return decryptedData;
  }
  