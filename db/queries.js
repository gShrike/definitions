const knex = require('./knex')

const updateTimestamp = (table, item_id, relation) => knex(table).where('id', item_id).update(relation + '_updated_at', knex.fn.now()).returning('*')

const getAll = (table, sortBy = 'name') => knex(table).orderByRaw(`lower(${sortBy}) ASC`)
const searchByName = (table, name) => knex(table).where('name', 'ilike', `%${name}%`).orderByRaw('lower(name) ASC')
const getOne = (table, id) => knex(table).where('id', id).first()
const getOneByName = (table, name) => knex(table).where('name', name).first()
const post = (table, body) => knex(table).insert(body).returning('*')
const update = (table, id, body) => knex(table).where('id', id).update(body).update('updated_at', knex.fn.now()).returning('*')
const remove = (table, id) => knex(table).where('id', id).del().returning('*')

const getAllTerms = (book_id) => knex('term').where('book_id', book_id).orderByRaw('lower(name) ASC')
const searchTerms = (book_id, term) => knex('term').where('book_id', book_id).where('name', 'ilike', `%${term}%`).orderByRaw('lower(name) ASC')
const getOneTerm = (book_id, id) => knex('term').where('book_id', book_id).where('id', id).first()
const getOneTermByName = (book_id, name) => knex('term').where('book_id', book_id).where('name', name).first()
const postTerm = (term) => knex('term').insert(term).returning('*')
const updateTerm = (book_id, id, term) => knex('term').where('book_id', book_id).where('id', id).update(term).update('updated_at', knex.fn.now()).returning('*')
const deleteTerm = (book_id, id) => knex('term').where('book_id', book_id).where('id', id).del().returning('*')


const getAllQuestions = (book_id) => knex('question').where('book_id', book_id).orderBy('id', 'DESC')
const searchQuestions = (book_id, term) => knex('question').where('book_id', book_id).where('title', 'ilike', `%${term}%`).orderByRaw('lower(title) ASC')
const getOneQuestion = (book_id, id) => knex('question').where('book_id', book_id).where('id', id).first()
const getOneQuestionByTitle = (book_id, title) => knex('question').where('book_id', book_id).where('title', title).first()
const postQuestion = (question) => knex('question').insert(question).returning('*')
const updateQuestion = (book_id, id, question) => knex('question').where('book_id', book_id).where('id', id).update(question).update('updated_at', knex.fn.now()).returning('*')
const deleteQuestion = (book_id, id) => knex('question').where('book_id', book_id).where('id', id).del().returning('*')

const getAllTopics = (book_id) => knex('topic').where('book_id', book_id).orderByRaw('lower(name) ASC')
const searchTopics = (book_id, term) => knex('topic').where('book_id', book_id).where('name', 'ilike', `%${term}%`).orderByRaw('lower(name) ASC')
const getOneTopic = (book_id, id) => knex('topic').where('book_id', book_id).where('id', id).first()
const getOneTopicByName = (book_id, name) => knex('topic').where('book_id', book_id).where('name', name).first()
const postTopic = (topic) => knex('topic').insert(topic).returning('*')
const updateTopic = (book_id, id, topic) => knex('topic').where('book_id', book_id).where('id', id).update(topic).update('updated_at', knex.fn.now()).returning('*')
const deleteTopic = (book_id, id) => knex('topic').where('book_id', book_id).where('id', id).del().returning('*')

/** Term relations **/

const getTopicsForTerm = (term_id) => knex('term_topic').where('term_id', term_id).then(term_topics => {
  const ids = term_topics.map(term_topic => term_topic.topic_id)
  return knex('topic').whereIn('id', ids).orderByRaw('lower(name) ASC')
})
const postTopicsForTerm = (term_id, topics) => {
  return knex('term_topic').where('term_id', term_id).del().then(dels => {
    return Promise.all(topics.map(topic => postTopicForTerm(term_id, topic.id))).then(results => updateTimestamp('term', term_id, 'topic').then(x => results))
  })
}
const postTopicForTerm = (term_id, topic_id) => knex('term_topic').insert({ term_id, topic_id })

const getQuestionsForTerm = (term_id) => knex('question_term').where('term_id', term_id).then(term_questions => {
  const ids = term_questions.map(term_question => term_question.question_id)
  return knex('question').whereIn('id', ids).orderByRaw('lower(title) ASC')
})
const postQuestionsForTerm = (term_id, questions) => {
  return knex('question_term').where('term_id', term_id).del().then(dels => {
    return Promise.all(questions.map(question => postQuestionForTerm(term_id, question.id))).then(results => updateTimestamp('term', term_id, 'question').then(x => results))
  })
}
const postQuestionForTerm = (term_id, question_id) => knex('question_term').insert({ term_id, question_id })

/** Topic relations **/

const getTermsForTopic = (topic_id) => knex('term_topic').where('topic_id', topic_id).then(term_topics => {
  const ids = term_topics.map(term_topic => term_topic.term_id)
  return knex('term').whereIn('id', ids).orderByRaw('lower(name) ASC')
})
const postTermsForTopic = (topic_id, terms) => {
  return knex('term_topic').where('topic_id', topic_id).del().then(dels => {
    return Promise.all(terms.map(term => postTermForTopic(topic_id, term.id))).then(results => updateTimestamp('topic', topic_id, 'term').then(x => results))
  })
}
const postTermForTopic = (topic_id, term_id) => knex('term_topic').insert({ term_id, topic_id })

const getQuestionsForTopic = (topic_id) => knex('question_topic').where('topic_id', topic_id).then(topic_questions => {
  const ids = topic_questions.map(topic_question => topic_question.question_id)
  return knex('question').whereIn('id', ids).orderByRaw('lower(title) ASC')
})
const postQuestionsForTopic = (topic_id, questions) => {
  return knex('question_topic').where('topic_id', topic_id).del().then(dels => {
    return Promise.all(questions.map(question => postQuestionForTopic(topic_id, question.id))).then(results => updateTimestamp('topic', topic_id, 'question').then(x => results))
  })
}
const postQuestionForTopic = (topic_id, question_id) => knex('question_topic').insert({ topic_id, question_id })

/** Question relations **/

const getTopicsForQuestion = (question_id) => knex('question_topic').where('question_id', question_id).then(question_topics => {
  const ids = question_topics.map(question_topic => question_topic.topic_id)
  return knex('topic').whereIn('id', ids).orderByRaw('lower(name) ASC')
})
const postTopicsForQuestion = (question_id, topics) => {
  return knex('question_topic').where('question_id', question_id).del().then(dels => {
    return Promise.all(topics.map(topic => postTopicForQuestion(question_id, topic.id))).then(results => updateTimestamp('question', question_id, 'topic').then(x => results))
  })
}
const postTopicForQuestion = (question_id, topic_id) => knex('question_topic').insert({ question_id, topic_id })

const getTermsForQuestion = (question_id) => knex('question_term').where('question_id', question_id).then(question_terms => {
  const ids = question_terms.map(question_term => question_term.term_id)
  return knex('term').whereIn('id', ids).orderByRaw('lower(name) ASC')
})
const postTermsForQuestion = (question_id, terms) => {
  return knex('question_term').where('question_id', question_id).del().then(dels => {
    return Promise.all(terms.map(term => postTermForQuestion(question_id, term.id))).then(results => updateTimestamp('question', question_id, 'term').then(x => results))
  })
}
const postTermForQuestion = (question_id, term_id) => knex('question_term').insert({ question_id, term_id })

module.exports = {
  getAll,
  searchByName,
  getOne,
  getOneByName,
  post,
  update,
  remove,

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

  getQuestionsForTerm,
  postQuestionsForTerm,
  postQuestionForTerm,

  getTermsForTopic,
  postTermsForTopic,
  postTermForTopic,

  getQuestionsForTopic,
  postQuestionsForTopic,
  postQuestionForTopic,

  getTopicsForQuestion,
  postTopicsForQuestion,
  postTopicForQuestion,

  getTermsForQuestion,
  postTermsForQuestion,
  postTermForQuestion
}
