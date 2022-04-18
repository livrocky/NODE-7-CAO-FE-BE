const express = require('express');
const { PORT } = require('./config');

const app = express();

app.get('/', (req, res) => res.json('OKAY'));

app.listen(PORT, () => console.log('server online, PORT', PORT));