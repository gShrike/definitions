const express = require('express')
const router = express.Router({ mergeParams: true })
const queries = require('../db/queries')
const auth = require('../middleware/auth')

router.get('/', (req, res, next) => {
  if (req.query.q) {
    queries.searchTopics(req.params.book_id, req.query.q)
      .then(topics => {
        res.json(topics)
      })
    return
  }

  queries.getAllTopics(req.params.book_id)
    .then(topics => {
      res.json(topics)
    })
})

router.get('/:id', (req, res, next) => {
  queries.getOneTopic(req.params.book_id, req.params.id)
    .then(topic => {
      if (!topic) {
        res.status(404).send({ message: `Topic not found` })
        return
      }

      res.json(topic)
    })
})

router.get('/:id/terms', (req, res, next) => {
  queries.getTermsForTopic(req.params.id)
    .then(terms => {
      res.json(terms)
    })
})

router.post('/:id/terms', auth.githubAuth, (req, res, next) => {
  queries.postTermsForTopic(req.params.id, req.body)
    .then(terms => {
      res.json(terms)
    })
})

router.get('/:id/questions', (req, res, next) => {
  queries.getQuestionsForTopic(req.params.id)
    .then(questions => {
      res.json(questions)
    })
})

router.post('/:id/questions', auth.githubAuth, (req, res, next) => {
  queries.postQuestionsForTopic(req.params.id, req.body)
    .then(questions => {
      res.json(questions)
    })
})

router.post('/', auth.githubAuth, (req, res, next) => {
  queries.getOneTopicByName(req.params.book_id, req.body.name).then(item => {
    if (item) {
      res.status(400).send({ message: `Topic already exists` })
      return next()
    }

    queries.postTopic({ ...req.body, book_id: req.params.book_id })
      .then(topic => {
        res.json(topic)
      })
  })
})

router.put('/:id', auth.githubAuth, (req, res, next) => {
  queries.getOneTopicByName(req.params.book_id, req.body.name).then(item => {
    if (item) {
      res.status(400).send({ message: `Topic already exists` })
      return next()
    }

    queries.updateTopic(req.params.book_id, req.params.id, req.body)
      .then(topic => {
        res.json(topic)
      })
  })
})

router.delete('/:id', auth.githubAuth, (req, res, next) => {
  queries.deleteTopic(req.params.id)
    .then(topic => {
      res.json({message: 'Topic deleted'})
    })
})

module.exports = router
