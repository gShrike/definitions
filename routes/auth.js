const express = require('express')
const router = express.Router()
const querystring = require('querystring')
const auth = require('../middleware/auth')
const request = require('request')
const url = require('url')

const allowedDomains = [
  'localhost',
  'galvanize-terms-ce05d.firebaseapp.com'
]

router.get('/login', (req, res, next) => {
  const { redirect_url } = req.query
  const domain = url.parse(redirect_url).hostname

  if (allowedDomains.indexOf(domain) === -1) {
    return res.status(401).json({ error: true, message: `Domain not allowed for redirects` })
  }

  res.cookie('gRedirect', redirect_url)
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=read:org`)
})

router.get('/github_callback', (req, res, next) => {
  const code = req.query.code

  if (!code) {
    return next()
  }

  const redirect_url = req.cookies.gRedirect
  const domain = url.parse(redirect_url).hostname

  if (allowedDomains.indexOf(domain) === -1) {
    return res.status(401).json({ error: true, message: `Domain not allowed for redirects` })
  }

  request.post('https://github.com/login/oauth/access_token', {
    form: {
      code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET
    }
  }, (err, response, body) => {
    const github = querystring.parse(body)
    console.log(github)
    console.log(`setting cookie: ${domain}`)

    // Set the cookie then redirect
    res.clearCookie('gRedirect')
    res.cookie('gToken', github.access_token, { domain, httpOnly: false })
    res.set('Content-Type', 'text/html')
    res.send(new Buffer(`<script>window.onload=function(){window.location.replace('${redirect_url}')}</script>`))
  })

})

router.get('/validate', auth.gShrikeMember, (req, res, next) => {
  res.json({ success: true, message: `Valid Github Organization member`})
})

module.exports = router
