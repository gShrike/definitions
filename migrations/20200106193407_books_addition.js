
exports.up = function(knex, Promise) {
  return knex.schema.createTable('book', (table) => {
    table.increments()
    table.text('name').notNullable()
    table.text('icon')
    table.boolean('public').defaultTo(false)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('book')
}
