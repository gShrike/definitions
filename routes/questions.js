const express = require('express')
const router = express.Router({ mergeParams: true })
const queries = require('../db/queries')
const auth = require('../middleware/auth')

router.get('/', (req, res, next) => {
  if (req.query.q) {
    queries.searchQuestions(req.params.book_id, req.query.q)
      .then(questions => {
        res.json(questions)
      })
    return
  }

  queries.getAllQuestions(req.params.book_id)
    .then(questions => {
      res.json(questions)
    })
})

router.get('/:id', (req, res, next) => {
  queries.getOneQuestion(req.params.book_id, req.params.id)
    .then(question => {
      if (!question) {
        res.status(404).send({ message: `Question not found` })
        return
      }

      res.json(question)
    })
})

router.post('/', auth.githubAuth, (req, res, next) => {
  queries.getOneQuestionByTitle(req.params.book_id, req.body.title).then(item => {
    if (item) {
      res.status(400).send({ message: `Question already exists` })
      return next()
    }

    queries.postQuestion({ ...req.body, book_id: req.params.book_id })
      .then(question => {
        res.json(question)
      })
  })
})

router.get('/:id/terms', (req, res, next) => {
  queries.getTermsForQuestion(req.params.id)
    .then(terms => {
      res.json(terms)
    })
})

router.post('/:id/terms', auth.githubAuth, (req, res, next) => {
  queries.postTermsForQuestion(req.params.id, req.body)
    .then(terms => {
      res.json(terms)
    })
})

router.get('/:id/topics', (req, res, next) => {
  queries.getTopicsForQuestion(req.params.id)
    .then(topics => {
      res.json(topics)
    })
})

router.post('/:id/topics', auth.githubAuth, (req, res, next) => {
  queries.postTopicsForQuestion(req.params.id, req.body)
    .then(topics => {
      res.json(topics)
    })
})

router.put('/:id', auth.githubAuth, (req, res, next) => {
  if (!req.body.title) {
    res.status(400).send({ message: `Question missing title` })
    return
  }

  queries.getOneQuestionByTitle(req.params.book_id, req.body.title).then(item => {
    if (item) {
      res.status(400).send({ message: `Question already exists` })
      return next()
    }

    queries.updateQuestion(req.params.book_id, req.params.id, req.body)
      .then(question => {
        res.json(question)
      })
  })
})

router.delete('/:id', auth.githubAuth, (req, res, next) => {
  queries.deleteQuestion(req.params.book_id, req.params.id)
    .then(question => {
      res.json({message: 'Question deleted'})
    })
})

module.exports = router
