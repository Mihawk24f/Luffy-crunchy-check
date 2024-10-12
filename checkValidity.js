const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { email, password } = JSON.parse(event.body);

    try {
        const response = await fetch('https://example.com/api/login', { // Replace with actual URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify({ success: data.success }) // Adjust based on the actual API response
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error checking validity' })
        };
    }
};