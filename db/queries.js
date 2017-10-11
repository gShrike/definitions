const knex = require('./knex')

getAllTerms = () => knex('term')
getOneTerm = (id) => knex('term').where('id', id)
postTerm = (term) => knex('term').insert(term).returning('*')
updateTerm = (id, term) => knex('term').where('id', id).update(term).returning('*')
deleteTerm = (id) => knex('term').where('id', id).del().returning('*')

module.exports = {
  getAllTerms,
  getOneTerm,
  postTerm,
  updateTerm,
  deleteTerm
}
