const { AuthenticationError } = require('apollo-server-micro')
const jwt = require('jsonwebtoken')
const { usersCollection } = require('mongo')

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
      user = await (await usersCollection()).findOne({ email: token.email })
    } catch (error) {
      throw new AuthenticationError(
        'Authentication token is invalid, please log in.'
      )
    }
  }

  return {
    email: token ? token.email : null,
    name: token ? token.name : null,
    role: user ? user.role : 'USER'
  }
}

module.exports = context
