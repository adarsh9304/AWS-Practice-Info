// lambdaFunction.js

exports.handler = async (event) => {
    try {
        console.log('Received event:', JSON.stringify(event));

        // Extract data from the event
        const { name } = event;

        // Process the data
        const greeting = `Hello, ${name}!`;

        // Prepare the response
        const response = {
            statusCode: 200,
            body: JSON.stringify({ message: greeting })
        };

        return response;
    } catch (error) {
        console.error('Error:', error);
        // Prepare an error response
        const response = {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
        return response;
    }
};
