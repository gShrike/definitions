const express = require('express')
const router = express.Router()
const querystring = require('querystring')
const auth = require('../middleware/auth')
const request = require('request')

router.get('/login', (req, res, next) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=read:org`)
})

router.get('/github_callback', (req, res, next) => {
  const code = req.query.code

  if (!code) {
    return next()
  }

  request.post('https://github.com/login/oauth/access_token', {
    form: {
      code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET
    }
  }, (err, response, body) => {
    const github = querystring.parse(body)

    res.cookie('gToken', github.access_token)
    res.redirect('/auth/validate')
    // res.json(github)
  })

})

router.get('/validate', auth.gShrikeMember, (req, res, next) => {
  res.json({ error: false, message: `Valid Github Organization member`})
})

module.exports = router
