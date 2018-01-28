const express = require('express');
const ensureCtype = require('./');

const ensureJson = ensureCtype('json');
const ensureCsvOrText = ensureCtype(['csv', 'text']);
const app = express();

app.post('/', ensureJson, (req, res) => {
  res.json('hello');
});

app.post('/data', ensureCsvOrText, (req, res) => {
  res.send(req.body);
});

app.listen(3000);
