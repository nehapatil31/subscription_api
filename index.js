const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const users = require('./controllers/users');
const subscription = require('./controllers/subscription');


app.use(express.json());
app.use(cors());

app.get('/', function (req, res) {
  res.send('Subscription api working ...');
});

app.get('/users', users.getUsers);
app.put('/user/:username', users.addUser);
app.get('/user/:username', users.getUser);

app.post ('/subscription', subscription.addSubscription);
app.get ('/subscription/:username/:date', subscription.getSubscriptionWithDate);
app.get ('/subscription/:username', subscription.getSubscription);

const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => console.log('server running ...'));





