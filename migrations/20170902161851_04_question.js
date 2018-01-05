
exports.up = function(knex, Promise) {
  return knex.schema.createTable('question', (table) => {
    table.increments()
    table.text('title').notNullable()
    table.text('answer').notNullable()
  })
}

// One for the Thumb!

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('question')
}
