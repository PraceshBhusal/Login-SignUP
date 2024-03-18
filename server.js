

const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');


const app = express(); // Express app 


app.use(express.json()); // Middleware for JSON parsing

// Define server port
const PORT = process.env.PORT || 3000;

// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'MySqlhan@100', 
  database: 'login_system'
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Define sign-up route
app.post('/signup', (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  // Insert user data into database
  pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while signing up.' });
    } else {
      res.status(200).json({ message: 'Sign-up successful.' });
    }
  });
});

// Define login route
app.post('/login', (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  // Check if user exists in database
  pool.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while logging in.' });
    } else if (results.length === 0) {
      res.status(401).json({ error: 'Invalid email or password.' });
    } else {
      const user = results[0];
      // Check if password matches
      if (user.password === password) {
        // Generate JWT token
        const token = jwt.sign({ email: user.email }, 'secret');
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Invalid email or password.' });
      }
    }
  });
});






// Add static file serving middleware
app.use(express.static('public'));

// Define route to serve login.html
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Define route to serve signup.html
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

// Implement sign-up route
app.post('/signup', (req, res) => {
  // Same as before
});

// Implement login route
app.post('/login', (req, res) => {
  // Same as before
});
