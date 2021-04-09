const express = require('express');
const app = express();
const port = 3000;
const categorize = require('./methods/categorizeItems.js');
const cors = require('cors');
const bodyParse = require('body-parser');

app.use(express.static(__dirname + '/../dist'));
app.use(bodyParse());
app.use(cors());

app.post('/categorize', (req, res) => {
  let lower = categorize.categorizeItems(req.body.uncategorized, req.body.categorized);
  res.send(lower);
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})