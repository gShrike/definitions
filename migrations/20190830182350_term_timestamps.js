
exports.up = function(knex, Promise) {
  return knex.schema.table('term', function (table) {
    table.timestamp('updated_at').defaultTo(knex.fn.now())
    table.timestamp('topic_updated_at').defaultTo(knex.fn.now())
    table.timestamp('question_updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.table('term', function (table) {
    table.dropColumn('updated_at')
    table.dropColumn('topic_updated_at')
    table.dropColumn('question_updated_at')
  })
}
