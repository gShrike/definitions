exports.up = function(knex, Promise) {
  return knex.schema.createTable('term_snippet', (table) => {
    table.increments()
    table.integer('snippet_id').references('snippet.id').unsigned().onDelete('cascade')
    table.integer('term_id').references('term.id').unsigned().onDelete('cascade')

  })
}

// JJWatt > von miller 

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('term_snippet')
}
