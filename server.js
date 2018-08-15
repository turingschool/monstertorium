const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


if (!module.parent) { // NEW!
  app.listen(3000, () => {
    console.log('The Monstertorium is live! (http://localhost:3000)');
  });
}

module.exports = app;
