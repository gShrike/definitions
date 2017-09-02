
exports.up = function(knex, Promise) {
  return knex.schema.createTable('question_term', (table) => {
    table.increments()
    table.integer('question_id').references('question.id').unsigned().onDelete('cascade')
    table.integer('term_id').references('term.id').unsigned().onDelete('cascade')

  })
}

//Broncos suck 

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('question_term')
}
