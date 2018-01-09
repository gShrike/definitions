const express = require('express')
const router = express.Router()
const queries = require('../db/queries')

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

router.post('/', (req, res, next) => {
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

router.put('/:id', (req, res, next) => {
  queries.getOneTermByName(req.body.name).then(item => {
    if (item) {
      res.status(400).send({ message: `Term already exists` })
      return next()
    }

    queries.updateTerm(req.params.id, req.body)
      .then(term => {
        res.json(term)
      })
  })
})

router.delete('/:id', (req, res, next) => {
  queries.deleteTerm(req.params.id)
    .then(term => {
      res.json({message: 'Term deleted. Go Pats!'})
    })
})

module.exports = router
