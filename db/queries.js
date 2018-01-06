const knex = require('./knex')

const getAllTerms = () => knex('term').orderBy('name', 'ASC')
const getOneTerm = (id) => knex('term').where('id', id).first()
const postTerm = (term) => knex('term').insert(term).returning('*')
const updateTerm = (id, term) => knex('term').where('id', id).update(term).returning('*')
const deleteTerm = (id) => knex('term').where('id', id).del().returning('*')


const getAllQuestions = () => knex('question').orderBy('id', 'DESC')
const getOneQuestion = (id) => knex('question').where('id', id).first()
const postQuestion = (question) => knex('question').insert(question).returning('*')
const updateQuestion = (id, question) => knex('question').where('id', id).update(question).returning('*')
const deleteQuestion = (id) => knex('question').where('id', id).del().returning('*')

const getAllCategories = () => knex('category').orderBy('name', 'ASC')
const getOneCategory = (id) => knex('category').where('id', id).first()
const getOneCategoryByName = (name) => knex('category').where('name', name).first()
const postCategory = (category) => knex('category').insert(category).returning('*')
const updateCategory = (id, category) => knex('category').where('id', id).update(category).returning('*')
const deleteCategory = (id) => knex('category').where('id', id).del().returning('*')


module.exports = {
  getAllTerms,
  getOneTerm,
  postTerm,
  updateTerm,
  deleteTerm,

  getAllQuestions,
  getOneQuestion,
  postQuestion,
  updateQuestion,
  deleteQuestion,

  getAllCategories,
  getOneCategory,
  getOneCategoryByName,
  postCategory,
  updateCategory,
  deleteCategory
}
