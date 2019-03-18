const express = require('express');
const cors = require('cors');
const db = require('./dbController');
const app = express();
const port = 8000;

db.init();

app.use(cors());
app.use(express.json());

const messages = require('./app/messages');
app.use('/messages', messages);

app.listen(port, () => {
    console.log('We"re live on http:localhost:' + port)
});


