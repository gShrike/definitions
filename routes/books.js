const express = require('express')
const router = express.Router()
const queries = require('../db/queries')
const auth = require('../middleware/auth')
const terms = require('./terms')
const topics = require('./topics')
const questions = require('./questions')

const dbTable = 'book'

const failIfBookNotFound = (req, res, next) => {
  queries.getOne(dbTable, req.params.book_id)
    .then(result => {
      if (!result) {
        res.status(404).send({ message: `Book not found` })
      }
      else {
        next()
      }
    })
}

router.get('/', (req, res, next) => {
  if (req.query.q) {
    queries.searchByName(dbTable, req.query.q)
      .then(results => {
        res.json(results)
      })
    return
  }

  queries.getAll(dbTable)
    .then(results => {
      res.json(results)
    })
})

router.get('/:book_id', failIfBookNotFound, (req, res, next) => {
  queries.getOne(dbTable, req.params.book_id)
    .then(result => {
      // attach all relations manually
      Promise.all([
        queries.getAllTerms(req.params.book_id),
        queries.getAllTopics(req.params.book_id),
        queries.getAllQuestions(req.params.book_id),
      ]).then(([terms, topics, questions]) => {
        res.json({
          ...result,
          terms, topics, questions
        })
      })
    })
})

router.use('/:book_id/terms', failIfBookNotFound, terms)
router.use('/:book_id/topics', failIfBookNotFound, topics)
router.use('/:book_id/questions', failIfBookNotFound, questions)

router.post('/', auth.githubAuth, auth.gShrikeMember, (req, res, next) => {
  queries.getOneByName(dbTable, req.body.name).then(item => {
    if (item) {
      res.status(400).send({ message: `Book already exists` })
      return next()
    }

    queries.post(dbTable, req.body)
      .then(result => {
        res.json(result)
      })
  })
})

router.put('/:book_id', auth.githubAuth, auth.gShrikeMember, (req, res, next) => {
  queries.getOneByName(dbTable, req.body.name).then(item => {
    if (item) {
      res.status(400).send({ message: `Book already exists` })
      return next()
    }

    queries.update(dbTable, req.params.book_id, req.body)
      .then(result => {
        res.json(result)
      })
  })
})

// router.delete('/:id', auth.githubAuth, auth.gShrikeMember, (req, res, next) => {
//   queries.remove(dbTable, req.params.book_id)
//     .then(x => {
//       res.json({message: 'Book deleted'})
//     })
// })

module.exports = router
