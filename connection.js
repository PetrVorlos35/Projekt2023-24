// const mysql = require('mysql2');
// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 3000;

// // Configure the MySQL connection
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'projekt3'
// });

// // Middleware to parse incoming POST data
// app.use(bodyParser.urlencoded({ extended: true }));

// // Define a route to handle the form submission
// app.post('/register', (req, res) => {
//     const username = req.body.Username;
//     const password = req.body.Password;
//     const passwordAgain = req.body.PasswordAgain;

//     // Perform validation here

//     if (password === passwordAgain) {
//         const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
//         const values = [username, password];

//         connection.query(sql, values, (err, result) => {
//             if (err) {
//                 console.error('Error inserting data:', err);
//                 res.send('Error inserting data');
//             } else {
//                 console.log('Data inserted successfully');
//                 res.send('Registration successful!');
//             }
//         });
//     } else {
//         res.send('Passwords do not match. Please try again.');
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });


// nejspíš nefunguje