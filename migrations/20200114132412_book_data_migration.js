
exports.up = function(knex, Promise) {
  return Promise.all([
    // create the first book
    knex.raw(`INSERT INTO book(id, name, icon, public, owner_id) VALUES (1, 'Dev Book', 'fa-terminal', true, '259196')`),
    // assign all current items to first book
    knex.raw(`UPDATE term SET book_id = 1`),
    knex.raw(`UPDATE topic SET book_id = 1`),
    knex.raw(`UPDATE question SET book_id = 1`)
  ])
};

exports.down = function(knex, Promise) {
  return knex.raw(`DELETE FROM book WHERE id = 1`)
};
