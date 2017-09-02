

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "category"; ALTER SEQUENCE category_id_seq RESTART WITH 3;')
    .then(function () {
      var category = [{
        id: 1,
        name: 'back-end'
      },
       {
        id: 2,
        name: 'front-end'
      }];
      return knex('category').insert(category);
    });
};
