
exports.up = function(knex, Promise) {
  return knex.schema.createTable('term', (table) => {
    table.increments()
    table.text('name').notNullable()
    table.text('definition')
    table.text('sentence')
    table.integer('category_id').references('category.id').unsigned().onDelete('cascade')
  })
}

// Go Pats!

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('term')
};
