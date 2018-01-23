
exports.up = function(knex, Promise) {
  return knex.schema.table('term', function (table) {
    table.dropColumn('category_id')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.table('term', function (table) {
    table.integer('category_id')
  })
}
