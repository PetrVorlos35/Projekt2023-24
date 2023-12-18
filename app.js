const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML form for registration
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

// Handle POST request for registration
app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Handle registration logic (e.g., save to a database)

    res.send(`Registration successful for ${username}!`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});