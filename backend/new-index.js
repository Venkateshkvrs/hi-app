// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'KVrsmck@21',
  database: 'mysql'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

let message = '';

app.get('/api/message', (req, res) => {
    // Retrieve message from MySQL
    connection.query('SELECT message FROM messages', (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).json({ error: 'Failed to retrieve message from database', mysqlError: err.message });
        return;
      }
      if (results.length > 0) {
        message = results[0].message;
      }
      res.json({ message });
    });
  });
  

app.post('/api/message', (req, res) => {
    const { newMessage } = req.body;
    message = newMessage;
  
    // Update message in MySQL
    connection.query('UPDATE messages SET message = ?', [newMessage], (err, results) => {
      if (err) {
        console.error('Error updating database:', err);
        res.status(500).json({ error: 'Failed to update message in database', mysqlError: err.message });
        return;
      }
      res.json({ message });
    });
  });

app.post('/api/store-message', (req, res) => {
  const { newMessage } = req.body;

  // Store message in MySQL
  connection.query('INSERT INTO messages (message) VALUES (?)', [newMessage], (err, results) => {
    if (err) {
      console.error('Error inserting into database:', err);
      res.status(500).json({ error: 'Failed to store message in database' });
      return;
    }
    res.json({ message: newMessage });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
