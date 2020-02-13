const { AuthenticationError } = require('apollo-server-micro')
const jwt = require('jsonwebtoken')
const { collection, prepare } = require('@apland/mongo')
const { json } = require('micro')

const context = async ({ req }) => {
  // Get the user token from the headers
  let token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null

  // Create null user
  let user

  // parse the request if body is not present
  if (!req.body) {
    req.body = await json(req)
  }

  // Verify token if available and query is not login user.
  if (token && !req.body.query.includes('loginUser')) {
    try {
      token = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from database
      user = prepare(await (await collection('users')).findOne({ email: token.email }))
    } catch (error) {
      throw new AuthenticationError(
        'Authentication token is invalid, please log in.'
      )
    }
  }

  return {
    user: user
  }
}

module.exports = context
