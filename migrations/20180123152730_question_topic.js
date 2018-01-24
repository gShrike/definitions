
exports.up = function(knex, Promise) {
  return knex.schema.createTable('question_topic', (table) => {
    table.increments()
    table.integer('question_id').references('question.id').unsigned().onDelete('cascade')
    table.integer('topic_id').references('topic.id').unsigned().onDelete('cascade')

  })
}

//Broncos suck

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('question_topic')
}
