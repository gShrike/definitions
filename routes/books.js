const express = require('express')
const router = express.Router()
const queries = require('../db/queries')
const auth = require('../middleware/auth')
const terms = require('./terms')
const topics = require('./topics')
const questions = require('./questions')

const dbTable = 'book'

const cullBooks = (books, github = { user: { id: -1 } }) => {
  return books.filter(book => book.public || book.owner_id.toString() === github.user.id.toString())
}

router.get('/', (req, res, next) => {
  auth.githubAuth(req, res, () => {
    if (req.query.q) {
      queries.searchByName(dbTable, req.query.q)
        .then(results => {
          res.json(cullBooks(results, res.locals.github))
        })
      return
    }
  
    queries.getAll(dbTable)
      .then(results => {
        res.json(cullBooks(results, res.locals.github))
      })
  }, true)
})

router.get('/:book_id', auth.bookAccess, (req, res, next) => {
  const { book } = res.locals

  // attach all relations manually
  Promise.all([
    queries.getAllTerms(book.id),
    queries.getAllTopics(book.id),
    queries.getAllQuestions(book.id),
  ]).then(([terms, topics, questions]) => {
    Promise.all([
      queries.getAllTermTopic(terms.map(t => t.id), topics.map(t => t.id)),
      queries.getAllQuestionTerm(questions.map(q => q.id), terms.map(t => t.id)),
      queries.getAllQuestionTopic(questions.map(q => q.id), topics.map(t => t.id)),
    ]).then(([term_topic, question_term, question_topic]) => {
      res.json({
        ...book,
        terms, topics, questions,
        term_topic, question_term, question_topic
      })
    })
  })
})

router.use('/:book_id/terms', auth.bookAccess, terms)
router.use('/:book_id/topics', auth.bookAccess, topics)
router.use('/:book_id/questions', auth.bookAccess, questions)

router.post('/', auth.githubAuth, (req, res, next) => {
  queries.getOneByName(dbTable, req.body.name).then(item => {
    if (item) {
      res.status(400).send({ message: `Book already exists` })
      return
    }

    queries.post(dbTable, { ...req.body, owner_id: res.locals.github.user.id })
      .then(result => {
        res.json(result)
      })
  })
})

// TODO: match name to owner
router.put('/:book_id', auth.bookOwner, (req, res, next) => {
  queries.getOneByName(dbTable, req.body.name).then(item => {
    if (item) {
      res.status(400).send({ message: `Book already exists` })
      return
    }

    queries.update(dbTable, req.params.book_id, req.body)
      .then(result => {
        res.json(result)
      })
  })
})

// router.delete('/:id', auth.bookOwner, (req, res, next) => {
//   queries.remove(dbTable, req.params.book_id)
//     .then(x => {
//       res.json({message: 'Book deleted'})
//     })
// })

module.exports = router
