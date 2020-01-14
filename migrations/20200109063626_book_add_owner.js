
exports.up = function(knex, Promise) {
  return knex.schema.table('book', function (table) {
    table.text('owner_id')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.table('book', function (table) {
    table.dropColumn('owner_id')
  })
}
