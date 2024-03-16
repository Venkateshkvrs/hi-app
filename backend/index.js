// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

let message = '';

app.get('/api/message', (req, res) => {
  res.json({ message });
});

app.post('/api/message', (req, res) => {
  const { newMessage } = req.body;
  message = newMessage;
  res.json({ message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
