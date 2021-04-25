const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const users = require('./controllers/users');


app.use(express.json());
app.use(cors());

app.get('/', function (req, res) {
  res.send('Subscription api working ...');
});
app.get('/users', users.getUsers);
app.put('/user/:username', users.addUser);
app.get('/user/:username', users.getUser);

const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => console.log('server running ...'));





