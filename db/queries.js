const knex = require('./knex')

const getAllTerms = () => knex('term').orderByRaw('lower(name) ASC')
const getOneTerm = (id) => knex('term').where('id', id).first()
const postTerm = (term) => knex('term').insert(term).returning('*')
const updateTerm = (id, term) => knex('term').where('id', id).update(term).returning('*')
const deleteTerm = (id) => knex('term').where('id', id).del().returning('*')


const getAllQuestions = () => knex('question').orderBy('id', 'DESC')
const getOneQuestion = (id) => knex('question').where('id', id).first()
const getOneQuestionByTitle = (title) => knex('question').where('title', title).first()
const postQuestion = (question) => knex('question').insert(question).returning('*')
const updateQuestion = (id, question) => knex('question').where('id', id).update(question).returning('*')
const deleteQuestion = (id) => knex('question').where('id', id).del().returning('*')

const getAllTopics = () => knex('topic').orderByRaw('lower(name) ASC')
const getOneTopic = (id) => knex('topic').where('id', id).first()
const getOneTopicByName = (name) => knex('topic').where('name', name).first()
const postTopic = (topic) => knex('topic').insert(topic).returning('*')
const updateTopic = (id, topic) => knex('topic').where('id', id).update(topic).returning('*')
const deleteTopic = (id) => knex('topic').where('id', id).del().returning('*')


module.exports = {
  getAllTerms,
  getOneTerm,
  postTerm,
  updateTerm,
  deleteTerm,

  getAllQuestions,
  getOneQuestion,
  getOneQuestionByTitle,
  postQuestion,
  updateQuestion,
  deleteQuestion,

  getAllTopics,
  getOneTopic,
  getOneTopicByName,
  postTopic,
  updateTopic,
  deleteTopic
}
