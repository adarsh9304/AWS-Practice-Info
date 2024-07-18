const AWS = require('aws-sdk');

/*
// Set up AWS SDK configuration for LocalStack
const ec2 = new AWS.EC2({
  endpoint: 'http://localhost:4566', // LocalStack endpoint
  accessKeyId: 'YOUR_ACCESS_KEY_ID', // LocalStack access key
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY', // LocalStack secret key
  region: 'us-east-1', // Any region can be used with LocalStack
});
*/

// Function to execute a command on the EC2 instance
async function executeCommandOnInstance(instanceId, command) {
  try {
    const params = {
      InstanceId: instanceId,
      DocumentName: 'AWS-RunShellScript',
      Parameters: {
        commands: [command],
      },
    };

    // Execute the command on the EC2 instance
    const data = await ec2.sendCommand(params).promise();
    const commandId = data.Command.CommandId;
    console.log(`Command ${commandId} sent to instance ${instanceId}`);

    // Wait for the command to finish execution
    while (true) {
      const commandStatus = await ec2.listCommands({ CommandId: commandId }).promise();
      const status = commandStatus.Commands[0].Status;
      if (status === 'Success') {
        console.log(`Command ${commandId} executed successfully`);
        break;
      } else if (status === 'Failed') {
        console.log(`Command ${commandId} execution failed`);
        break;
      } else {
        console.log(`Command ${commandId} is still ${status}. Waiting...`);
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before checking again
      }
    }
  } catch (err) {
    console.error('Error executing command on EC2 instance:', err);
  }
}

// Example usage: Execute 'uname -a' command on the EC2 instance with instanceId 'i-0123456789abcdef0'
const instanceId = 'i-0123456789abcdef0';
const command = 'uname -a';
executeCommandOnInstance(instanceId, command);
