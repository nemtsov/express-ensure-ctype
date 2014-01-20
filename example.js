var express = require('express'),
  ensureCtype = require('./'),
  ensureJson = ensureCtype('json'),
  ensureCsvOrText = ensureCtype(['csv', 'text']),
  app = express();

app.post('/', ensureJson, function (req, res) {
  res.json(req.body);
});

app.post('/data', ensureCsvOrText, function (req, res) {
  res.send(req.body);
});

app.listen(3000);
