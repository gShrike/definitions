
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('term', (table) => {
      table.integer('book_id').references('book.id').unsigned().onDelete('cascade')
    }),
    knex.schema.table('topic', (table) => {
      table.integer('book_id').references('book.id').unsigned().onDelete('cascade')
    }),
    knex.schema.table('question', (table) => {
      table.integer('book_id').references('book.id').unsigned().onDelete('cascade')
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('term', function (table) {
      table.dropColumn('book_id')
    }),
    knex.schema.table('topic', function (table) {
      table.dropColumn('book_id')
    }),
    knex.schema.table('question', function (table) {
      table.dropColumn('book_id')
    })
  ])
}
