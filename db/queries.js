const knex = require('./knex')

const updateTimestamp = (table, item_id, relation) => knex(table).where('id', item_id).update(relation + '_updated_at', knex.fn.now()).returning('*')

const getAllTerms = () => knex('term').orderByRaw('lower(name) ASC')
const searchTerms = (term) => knex('term').where('name', 'ilike', `%${term}%`).orderByRaw('lower(name) ASC')
const getOneTerm = (id) => knex('term').where('id', id).first()
const getOneTermByName = (name) => knex('term').where('name', name).first()
const postTerm = (term) => knex('term').insert(term).returning('*')
const updateTerm = (id, term) => knex('term').where('id', id).update(term).update('updated_at', knex.fn.now()).returning('*')
const deleteTerm = (id) => knex('term').where('id', id).del().returning('*')


const getAllQuestions = () => knex('question').orderBy('id', 'DESC')
const searchQuestions = (term) => knex('question').where('title', 'ilike', `%${term}%`).orderByRaw('lower(title) ASC')
const getOneQuestion = (id) => knex('question').where('id', id).first()
const getOneQuestionByTitle = (title) => knex('question').where('title', title).first()
const postQuestion = (question) => knex('question').insert(question).returning('*')
const updateQuestion = (id, question) => knex('question').where('id', id).update(question).update('updated_at', knex.fn.now()).returning('*')
const deleteQuestion = (id) => knex('question').where('id', id).del().returning('*')

const getAllTopics = () => knex('topic').orderByRaw('lower(name) ASC')
const searchTopics = (term) => knex('topic').where('name', 'ilike', `%${term}%`).orderByRaw('lower(name) ASC')
const getOneTopic = (id) => knex('topic').where('id', id).first()
const getOneTopicByName = (name) => knex('topic').where('name', name).first()
const postTopic = (topic) => knex('topic').insert(topic).returning('*')
const updateTopic = (id, topic) => knex('topic').where('id', id).update(topic).update('updated_at', knex.fn.now()).returning('*')
const deleteTopic = (id) => knex('topic').where('id', id).del().returning('*')

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
