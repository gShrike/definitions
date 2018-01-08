
exports.up = function(knex, Promise) {
  return knex.schema.renameTable('category', 'topic')
};

exports.down = function(knex, Promise) {
  return knex.schema.renameTable('topic', 'category')
};
