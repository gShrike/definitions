const express = require('express')
const router = express.Router()
const queries = require('../db/queries')

router.get('/', (req, res, next) => {
  queries.getAllCategories()
    .then(categories => {
      res.json(categories)
    })
})

router.get('/:id', (req, res, next) => {
  queries.getOneCategory(req.params.id)
    .then(category => {
      res.json(category)
    })
})

router.post('/', (req, res, next) => {
  queries.getOneCategoryByName(req.body.name).then(item => {
    if (item) {
      res.status(400).send({ message: `Category already exists` })
      return next()
    }

    queries.postCategory(req.body)
      .then(category => {
        res.json(category)
      })
  })
})

router.put('/:id', (req, res, next) => {
  queries.updateCategory(req.params.id, req.body)
    .then(category => {
      res.json(category)
    })
})

router.delete('/:id', (req, res, next) => {
  queries.deleteCategory(req.params.id)
    .then(category => {
      res.json({message: 'Category deleted'})
    })
})

module.exports = router
