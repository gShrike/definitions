const request = require('request')
const queries = require('../db/queries')

const auth = {

  // passThroughEmptyToken will call next() if token is missing (for alternate errors)
  githubAuth: (req, res, next, passThroughEmptyToken = false) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
      const githubAccessToken = authHeader.substr(7)

      if ((!githubAccessToken || githubAccessToken === 'undefined') && passThroughEmptyToken) {
        return next()
      }

      request({
        url: 'https://api.github.com/user',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${githubAccessToken}`,
          'User-Agent': `Definitions API`
        }
      }, (err, response, body) => {
        const output = { error: false, user: null, message: null }
        const data = JSON.parse(body)
        // https://developer.github.com/v3/users/#response-with-public-profile-information

        switch (response.statusCode) {
          case 401:
            output.error = true
            output.message = `Bad credentials`
            break
          case 200:
            output.user = data
            output.message = `Valid credentials`
            break
        }

        if (output.error) {
          return res.status(401).json(output)
        }

        res.locals.github = output

        next()
      })
    }
    else {
      return res.status(401).json({ error: true, message: `Not logged in` })
    }
  },

  githubOrgAuth: (req, res, next) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
      const githubAccessToken = authHeader.substr(7)

      request({
        url: 'https://api.github.com/user/memberships/orgs/gShrike',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${githubAccessToken}`,
          'User-Agent': `Definitions API`
        }
      }, (err, response, body) => {
        const output = { error: false, member: false, message: null }
        const data = JSON.parse(body)
        // https://developer.github.com/v3/orgs/#get-an-organization

        switch (response.statusCode) {
          case 404:
            output.message = `Not a member of the Github Organization`
            break
          case 401:
            output.error = true
            output.message = `Bad credentials`
            break
          case 200:
            output.member = true
            output.message = `Valid member of the Github Organization`
            break
        }

        if (response.statusCode === 200 && data.state !== `active`) {
          output.message = `Not an active member of the Github Organization`
        }

        if (output.error) {
          return res.status(401).json(output)
        }

        res.locals.github = output

        next()
      })
    }
    else {
      return res.status(401).json({ error: true, message: `Not logged in` })
    }
  },

  gShrikeMember: (req, res, next) => {
    const { github } = res.locals
    if (!github.member) {
      return res.status(401).json({ error: true, message: github.message })
    }

    next()
  },

  bookAccess: (req, res, next) => {
    queries.getOne('book', req.params.book_id)
      .then(book => {
        res.locals.book = book

        if (!book) {
          res.status(404).send({ message: `Book not found` })
        }
        else if (!book.public) {
          auth.bookOwner(req, res, next)
        }
        else {
          next()
        }
      })
  },

  bookOwner: (req, res, next) => {
    const { book } = res.locals

    auth.githubAuth(req, res, () => {
      if (!res.locals.github || book.owner_id.toString() !== res.locals.github.user.id.toString()) {
        res.status(401).json({ error: true, message: `Book access not allowed` })
      }
      else {
        next()
      }
    }, true)
  }

}

module.exports = auth