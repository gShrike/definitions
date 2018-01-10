
exports.up = function(knex, Promise) {
  return knex.schema.createTable('term_topic', (table) => {
    table.increments()
    table.integer('term_id').references('term.id').unsigned().onDelete('cascade')
    table.integer('topic_id').references('topic.id').unsigned().onDelete('cascade')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('term_topic')
}
