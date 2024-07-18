const AWS = require('aws-sdk');
const util = require('util');
const sleep = util.promisify(setTimeout);

/*
// Set up AWS SDK configuration for LocalStack
const ec2 = new AWS.EC2({
  endpoint: 'http://localhost:4566', // LocalStack endpoint
  accessKeyId: 'YOUR_ACCESS_KEY_ID', // LocalStack access key
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY', // LocalStack secret key
  region: 'us-east-1', // Any region can be used with LocalStack
});
*/

// Function to create an EC2 instance
async function createEC2Instance() {
  try {
    const params = {
      ImageId: 'ami-12345678', 
      InstanceType: 't2.micro',
      MaxCount: 1,
      MinCount: 1,
    };

    // Launch the EC2 instance
    const data = await ec2.runInstances(params).promise();
    const instanceId = data.Instances[0].InstanceId;
    console.log(`Instance ${instanceId} is launching...`);

    // Wait for the instance to be in 'running' state
    while (true) {
      const describeParams = {
        InstanceIds: [instanceId],
      };
      const describeData = await ec2.describeInstances(describeParams).promise();
      const state = describeData.Reservations[0].Instances[0].State.Name;
      if (state === 'running') {
        console.log(`Instance ${instanceId} is now running!`);
        break;
      } else {
        console.log(`Instance ${instanceId} is still in ${state} state. Waiting...`);
        await sleep(5000); // Wait for 5 seconds before checking again
      }
    }

    // Get public IP address of the instance
    const describeParams = {
      InstanceIds: [instanceId],
    };
    const describeData = await ec2.describeInstances(describeParams).promise();
    const publicIp = describeData.Reservations[0].Instances[0].PublicIpAddress;
    console.log(`Public IP address of the instance: ${publicIp}`);
  } catch (err) {
    console.error('Error creating EC2 instance:', err);
  }
}

// Call the function to create the EC2 instance
createEC2Instance();
