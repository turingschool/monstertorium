exports.seed = function(knex, Promise) {
  return knex('my_monsters').del()
  .then(() => {
    return Promise.all([
      knex('my_monsters').insert({
        id: 1,
        name: 'Alex Tideman',
        created_at: new Date
      }),
      knex('my_monsters').insert({
        id: 2,
        name: 'Bob Barker',
        created_at: new Date
      }),
      knex('my_monsters').insert({
        id: 3,
        name: 'Martha Stewart',
        created_at: new Date
      })
    ]);
  });
};
