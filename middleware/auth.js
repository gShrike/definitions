const request = require('request')

module.exports = {

  githubAuth: function(req, res, next) {
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

  gShrikeMember: function(req, res, next) {
    const { github } = res.locals
    if (!github.member) {
      return res.status(401).json({ error: true, message: github.message })
    }

    next()
  }

}
