const AWS = require("aws-sdk");

// Configure the AWS region
AWS.config.update({ region: "ap-south-1" });

// Create an SQS service object
/*

const sqs = new AWS.SQS({ apiVersion: "2024-04-18",
  accessKeyId: 'ACCESS_KEY_ID',
  secretAccessKey: 'SECRET_ACCESS_KEY', 

});
*/


const queueURL =
  "https://sqs.ap-south-1.amazonaws.com/381492223965/Queue-for-inventory";

const sendMessage = async (messageBody) => {
  const params = {
    QueueUrl: queueURL,
    MessageBody: messageBody,
  };

  try {
    const data = await sqs.sendMessage(params).promise();
    console.log("Message sent, ID:", data.MessageId);
  } catch (err) {
    console.error("Error", err);
  }
};

console.log(new Date().getMilliseconds)
for(let i=0;i<=25;i++){
  sendMessage(`Message no ${i}`)
}
console.log(new Date().getMilliseconds)