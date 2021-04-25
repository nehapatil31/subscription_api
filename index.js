const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', function (req, res) {
  res.send('Subscription api working ...');
});

const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => console.log('server running ...'));

