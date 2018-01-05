

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "category"; ALTER SEQUENCE category_id_seq RESTART WITH 3;')
    .then(function () {
      var category = [{
        id: 1,
        name: 'Backend'
      },
       {
        id: 2,
        name: 'Front end'
      }];
      return knex('category').insert(category);
    });
};
