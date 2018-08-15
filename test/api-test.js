const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

describe('GET /api/v1/monsters', () => {
  
});

describe('POST /api/v1/monsters', () => {

});

describe('UPDATE /monsters/:id', () => {

});

describe('DELETE /monsters/:id', () => {

});

if (!module.parent) { // NEW!
  app.listen(3000, () => {
    console.log('The Monstertorium is live! (http://localhost:3000)');
  });
}

module.exports = app;
