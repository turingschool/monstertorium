const assert = require('chai').assert;
const request = require('supertest');
const app = require('../server');

describe('GET /api/v1/monsters', () => {

  beforeEach(() => {
    app.locals.monsters = [{ id: 1, name: 'Steve', level: 2 }];
  });

  afterEach(() => {
    app.locals.monsters = [];
  });

  it('should return a 200 status code', (done) => {
    request(app)
      .get('/api/v1/monsters')
      .expect(200, done);
  });

  it('should return a set monsters stored in app.locals.monsters', (done) => {
    request(app)
      .get('/api/v1/monsters')
      .expect(200, {
        monsters: app.locals.monsters
      }, done);
  });

});

describe('POST /api/v1/monsters', () => {

  beforeEach(() => {
    app.locals.monsters = [];
  });

  it('should create a new monster', (done) => {
    const monster = { id: 1, name: 'Steve', level: 2 };

    request(app)
      .post('/api/v1/monsters')
      .send({ monster: monster })
      .expect(201)
      .end(() => {
        assert.include(app.locals.monsters, monster);
        done();
      });
  });
});


describe('UPDATE /monsters/:id', () => {

  beforeEach(() => {
    app.locals.monsters = [{ id: 1, name: 'Steve', level: 2 }];
  });

  afterEach(() => {
    app.locals.monsters = [];
  });

  it('should update a record with the correct "id"', (done) => {
    const monster = app.locals.monsters[0];

    request(app)
      .put(`/api/v1/monsters/${monster.id}`)
      .send({ monster: { name: 'Louisa' } })
      .expect(204)
      .end(() => {
        assert.notEqual(app.locals.monsters[0].name, 'Steve');
        assert.equal(app.locals.monsters[0].name, 'Louisa');
        done();
      });
  });

});

describe('DELETE /monsters/:id', () => {

  beforeEach(() => {
    app.locals.monsters = [{ id: 1, name: 'Steve', level: 3 }];
  });

  afterEach(() => {
    app.locals.monsters = [];
  });

  it('should delete a record', (done) => {
    request(app)
      .delete(`/monsters/1`)
      .expect(204)
      .end(() => {
        assert.equal(app.locals.monsters.length, 0);
        done();
      });
  });

  it('should return a 404 status if there is no idea', (done) => {
    request(app)
      .delete('/monsters/invalid')
      .expect(404, done);
  });

});
