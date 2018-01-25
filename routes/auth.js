const express = require('express')
const router = express.Router()
const querystring = require('querystring')
const auth = require('../middleware/auth')
const request = require('request')
const url = require('url')

router.get('/login', (req, res, next) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=read:org`)
})

router.post('/token', (req, res, next) => {
  const code = req.body.code

  if (!code) {
    return res.status(400).json({ error: true, message: `A 'code' is required` })
  }

  request.post('https://github.com/login/oauth/access_token', {
    form: {
      code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET
    }
  }, (err, response, body) => {
    const github = querystring.parse(body)
    res.json(github)
  })

})

router.get('/validate', auth.githubAuth, (req, res, next) => {
  const { github } = res.locals
  const result = { success: true, message: `Valid Github member`}

  if (github.member) {
    result.member = true
    result.message = github.message
  }

  res.json(result)
})

module.exports = router
