exports.up = function(knex, Promise) {
  return knex.schema.createTable('related_term', (table) => {
    table.increments()
    table.integer('term1_id').references('term.id').unsigned().onDelete('cascade')
    table.integer('term2_id').references('term.id').unsigned().onDelete('cascade')

  })
}

//Bean town forevah

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('related_term')
}
