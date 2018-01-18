const request = require('request')

module.exports = {

  gShrikeMember: function(req, res, next) {
    const githubAccessToken = req.cookies.gToken

    if (githubAccessToken) {
      request({
        url: 'https://api.github.com/user/memberships/orgs/gShrike',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${githubAccessToken}`,
          'User-Agent': `Galvanize Definitions API`
        }
      }, (err, response, body) => {
        const error = { error: false, message: null }
        const data = JSON.parse(body)

        switch (response.statusCode) {
          case 404:
            error.error = true
            error.message = `Not a member of the Github Organization`
            break
          case 401:
            error.error = true
            error.message = `Bad credentials`
            break
          case 200:
            break
        }

        if (response.statusCode === 200 && data.state !== `active`) {
          error.error = true
          error.message = `Not an active member of the Github Organization`
        }

        if (error.error) {
          return res.status(401).json(error)
        }

        next()
      })
    }
    else {
      return res.status(401).json({ error: true, message: `Not logged in` })
    }
  }

}
