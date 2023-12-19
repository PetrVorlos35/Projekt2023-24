const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'projekt3', // Change this to your database name
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// ... (previous code)

// Serve the registration form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

// Handle form submission
app.post('/process', (req, res) => {
  const { username, password } = req.body;

  const sql = 'INSERT INTO Uzivatele (Username, Heslo) VALUES (?, ?)';
  db.query(sql, [username, password], (err, result) => {
      if (err) throw err;
      console.log('User registered successfully');
      res.redirect('/?registered=true'); // Redirect with query parameter
  });
});

// Handle login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Query to check if the user exists and the password is correct
  const sql = 'SELECT * FROM Uzivatele WHERE Username = ? AND Heslo = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) throw err;

    // Check if user exists
    if (results.length > 0) {
      console.log('Login successful');
      // Handle login success (e.g., redirect to a dashboard)
      res.redirect('/game.html');
    } else {
      console.log('Incorrect Username and/or Password!');
      res.send('Incorrect Username and/or Password!');
    }
  });
});

app.use(express.static('public'));

// app.get('/dashboard', (req, res) => {
//   res.send('Welcome to your dashboard!');
// });

  
  // Serve the registration process page
  app.get('/process', (req, res) => {
    res.sendFile(__dirname + '/process.html');
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});