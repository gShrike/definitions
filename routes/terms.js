const express = require('express')
const router = express.Router({ mergeParams: true })
const queries = require('../db/queries')
const auth = require('../middleware/auth')

// TERMS ROUTES
router.get('/', (req, res, next) => {
  if (req.query.q) {
    queries.searchTerms(req.params.book_id, req.query.q)
      .then(terms => {
        res.json(terms)
      })
    return
  }

  queries.getAllTerms(req.params.book_id)
    .then(terms => {
      res.json(terms)
    })
})

router.get('/:id', (req, res, next) => {
  queries.getOneTerm(req.params.book_id, req.params.id)
    .then(term => {
      if (!term) {
        res.status(404).send({ message: `Term not found` })
        return
      }

      res.json(term)
    })
})

router.get('/:id/topics', (req, res, next) => {
  queries.getTopicsForTerm(req.params.id)
    .then(topics => {
      res.json(topics)
    })
})

router.post('/:id/topics', auth.githubAuth, (req, res, next) => {
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

router.post('/:id/questions', auth.githubAuth, (req, res, next) => {
  queries.postQuestionsForTerm(req.params.id, req.body)
    .then(questions => {
      res.json(questions)
    })
})

router.post('/', auth.githubAuth, (req, res, next) => {
  queries.getOneTermByName(req.params.book_id, req.body.name).then(item => {
    if (item) {
      res.status(400).send({ message: `Term already exists` })
      return next()
    }

    queries.postTerm({ ...req.body, book_id: req.params.book_id })
      .then(term => {
        res.json(term)
      })
  })
})

router.put('/:id', auth.githubAuth, (req, res, next) => {
  const gettingByName = !!req.body.name

  const query = gettingByName ?
    queries.getOneTermByName(req.params.book_id, req.body.name)
    : queries.getOneTerm(req.params.book_id, req.params.id)

  query.then(item => {
    if (gettingByName && item) {
      res.status(400).send({ message: `Term already exists` })
      return next()
    }

    queries.updateTerm(req.params.book_id, req.params.id, req.body)
      .then(term => {
        res.json(term)
      })
  })
})

router.delete('/:id', auth.githubAuth, (req, res, next) => {
  queries.deleteTerm(req.params.id)
    .then(term => {
      res.json({message: 'Term deleted. Go Pats!'})
    })
})

module.exports = router
