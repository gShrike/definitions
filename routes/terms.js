const express = require('express')
const router = express.Router()
const queries = require('../db/queries')
const auth = require('../middleware/auth')

// TERMS ROUTES
router.get('/', (req, res, next) => {
  if (req.query.q) {
    queries.searchTerms(req.query.q)
      .then(terms => {
        res.json(terms)
      })
    return
  }

  queries.getAllTerms()
    .then(terms => {
      res.json(terms)
    })
})

router.get('/:id', (req, res, next) => {
  queries.getOneTerm(req.params.id)
    .then(term => {
      res.json(term)
    })
})

router.get('/:id/topics', (req, res, next) => {
  queries.getTopicsForTerm(req.params.id)
    .then(topics => {
      res.json(topics)
    })
})

router.post('/:id/topics', auth.gShrikeMember, (req, res, next) => {
  queries.postTopicsForTerm(req.params.id, req.body)
    .then(topics => {
      res.json(topics)
    })
})

router.get('/:id/questions', (req, res, next) => {
  queries.getQuestionsForTerm(req.params.id)
    .then(questions => {
      res.json(questions)
    })
})

router.post('/:id/questions', auth.gShrikeMember, (req, res, next) => {
  queries.postQuestionsForTerm(req.params.id, req.body)
    .then(questions => {
      res.json(questions)
    })
})

router.post('/', auth.gShrikeMember, (req, res, next) => {
  queries.getOneTermByName(req.body.name).then(item => {
    if (item) {
      res.status(400).send({ message: `Term already exists` })
      return next()
    }

    queries.postTerm(req.body)
      .then(term => {
        res.json(term)
      })
  })
})

router.put('/:id', auth.gShrikeMember, (req, res, next) => {
  const gettingByName = !!req.body.name

  const query = gettingByName ?
    queries.getOneTermByName(req.body.name)
    : queries.getOneTerm(req.params.id)

  query.then(item => {
    if (gettingByName && item) {
      res.status(400).send({ message: `Term already exists` })
      return next()
    }

    queries.updateTerm(req.params.id, req.body)
      .then(term => {
        res.json(term)
      })
  })
})

router.delete('/:id', auth.gShrikeMember, (req, res, next) => {
  queries.deleteTerm(req.params.id)
    .then(term => {
      res.json({message: 'Term deleted. Go Pats!'})
    })
})

module.exports = router
