const { AuthenticationError } = require('apollo-server-micro')
const jwt = require('jsonwebtoken')
const { collection, prepare } = require('mongo')

const context = async ({ req }) => {

  // Get the user token from the headers
  let token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null

  // Create null user
  let user

  // Verify token if available
  if (token) {
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
