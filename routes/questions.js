const express = require('express')
const router = express.Router()
const queries = require('../db/queries')

router.get('/', (req, res, next) => {
  if (req.query.q) {
    queries.searchQuestions(req.query.q)
      .then(questions => {
        res.json(questions)
      })
    return
  }

  queries.getAllQuestions()
    .then(questions => {
      res.json(questions)
    })
})

router.get('/:id', (req, res, next) => {
  queries.getOneQuestion(req.params.id)
    .then(question => {
      res.json(question)
    })
})

router.post('/', (req, res, next) => {
  queries.getOneQuestionByTitle(req.body.title).then(item => {
    if (item) {
      res.status(400).send({ message: `Question already exists` })
      return next()
    }

    queries.postQuestion(req.body)
      .then(question => {
        res.json(question)
      })
  })
})

router.put('/:id', (req, res, next) => {
  queries.getOneQuestionByTitle(req.body.title).then(item => {
    if (item) {
      res.status(400).send({ message: `Question already exists` })
      return next()
    }

    queries.updateQuestion(req.params.id, req.body)
      .then(question => {
        res.json(question)
      })
  })
})

router.delete('/:id', (req, res, next) => {
  queries.deleteQuestion(req.params.id)
    .then(question => {
      res.json({message: 'Question deleted'})
    })
})

module.exports = router
