const express = require('express')
const router = express.Router()
const queries = require('../db/queries')

router.get('/', (req, res, next) => {
  if (req.query.q) {
    queries.searchTopics(req.query.q)
      .then(topics => {
        res.json(topics)
      })
    return
  }

  queries.getAllTopics()
    .then(topics => {
      res.json(topics)
    })
})

router.get('/:id', (req, res, next) => {
  queries.getOneTopic(req.params.id)
    .then(topic => {
      res.json(topic)
    })
})

router.get('/:id/terms', (req, res, next) => {
  queries.getTermsForTopic(req.params.id)
    .then(terms => {
      res.json(terms)
    })
})

router.post('/:id/terms', (req, res, next) => {
  queries.postTermsForTopic(req.params.id, req.body)
    .then(terms => {
      res.json(terms)
    })
})

router.post('/', (req, res, next) => {
  queries.getOneTopicByName(req.body.name).then(item => {
    if (item) {
      res.status(400).send({ message: `Topic already exists` })
      return next()
    }

    queries.postTopic(req.body)
      .then(topic => {
        res.json(topic)
      })
  })
})

router.put('/:id', (req, res, next) => {
  queries.getOneTopicByName(req.body.name).then(item => {
    if (item) {
      res.status(400).send({ message: `Topic already exists` })
      return next()
    }

    queries.updateTopic(req.params.id, req.body)
      .then(topic => {
        res.json(topic)
      })
  })
})

router.delete('/:id', (req, res, next) => {
  queries.deleteTopic(req.params.id)
    .then(topic => {
      res.json({message: 'Topic deleted'})
    })
})

module.exports = router
