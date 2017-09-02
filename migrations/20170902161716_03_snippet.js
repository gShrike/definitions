
exports.up = function(knex, Promise) {
  return knex.schema.createTable('snippet', (table) => {
    table.increments()
    table.text('content').notNullable()
  })
}

// TB12 GOAT!

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('snippet')
}
