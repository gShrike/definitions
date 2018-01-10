const knex = require('./knex')

const getAllTerms = () => knex('term').orderByRaw('lower(name) ASC')
const searchTerms = (term) => knex('term').where('name', 'ilike', `%${term}%`)
const getOneTerm = (id) => knex('term').where('id', id).first()
const getOneTermByName = (name) => knex('term').where('name', name).first()
const postTerm = (term) => knex('term').insert(term).returning('*')
const updateTerm = (id, term) => knex('term').where('id', id).update(term).returning('*')
const deleteTerm = (id) => knex('term').where('id', id).del().returning('*')


const getAllQuestions = () => knex('question').orderBy('id', 'DESC')
const searchQuestions = (term) => knex('question').where('title', 'ilike', `%${term}%`)
const getOneQuestion = (id) => knex('question').where('id', id).first()
const getOneQuestionByTitle = (title) => knex('question').where('title', title).first()
const postQuestion = (question) => knex('question').insert(question).returning('*')
const updateQuestion = (id, question) => knex('question').where('id', id).update(question).returning('*')
const deleteQuestion = (id) => knex('question').where('id', id).del().returning('*')

const getAllTopics = () => knex('topic').orderByRaw('lower(name) ASC')
const searchTopics = (term) => knex('topic').where('name', 'ilike', `%${term}%`)
const getOneTopic = (id) => knex('topic').where('id', id).first()
const getOneTopicByName = (name) => knex('topic').where('name', name).first()
const postTopic = (topic) => knex('topic').insert(topic).returning('*')
const updateTopic = (id, topic) => knex('topic').where('id', id).update(topic).returning('*')
const deleteTopic = (id) => knex('topic').where('id', id).del().returning('*')

const getTopicsForTerm = (term_id) => knex('term_topic').where('term_id', term_id).then(term_topics => {
  const ids = term_topics.map(term_topic => term_topic.topic_id)
  return knex('topic').whereIn('id', ids).orderByRaw('lower(name) ASC')
})
const postTopicsForTerm = (term_id, topics) => {
  return knex('term_topic').where('term_id', term_id).del().then(dels => {
    return Promise.all(topics.map(topic => postTopicForTerm(term_id, topic.id)))
  })
}
const postTopicForTerm = (term_id, topic_id) => knex('term_topic').insert({ term_id, topic_id })

const getTermsForTopic = (topic_id) => knex('term_topic').where('topic_id', topic_id).then(term_topics => {
  const ids = term_topics.map(term_topic => term_topic.term_id)
  return knex('term').whereIn('id', ids).orderByRaw('lower(name) ASC')
})
const postTermsForTopic = (topic_id, terms) => {
  return knex('term_topic').where('topic_id', topic_id).del().then(dels => {
    return Promise.all(terms.map(term => postTermForTopic(topic_id, term.id)))
  })
}
const postTermForTopic = (topic_id, term_id) => knex('term_topic').insert({ term_id, topic_id })

module.exports = {
  getAllTerms,
  searchTerms,
  getOneTerm,
  getOneTermByName,
  postTerm,
  updateTerm,
  deleteTerm,

  getAllQuestions,
  searchQuestions,
  getOneQuestion,
  getOneQuestionByTitle,
  postQuestion,
  updateQuestion,
  deleteQuestion,

  getAllTopics,
  searchTopics,
  getOneTopic,
  getOneTopicByName,
  postTopic,
  updateTopic,
  deleteTopic,

  getTopicsForTerm,
  postTopicsForTerm,
  postTopicForTerm,

  getTermsForTopic,
  postTermsForTopic,
  postTermForTopic
}
