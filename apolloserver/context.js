const { AuthenticationError } = require('apollo-server-micro')
const jwt = require('jsonwebtoken')

const context = ({ req }) => {

    // Get the user token from the headers
    let token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null

    // Verify token if available
    if (token) {
        try {
            token = jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            throw new AuthenticationError(
                'Authentication token is invalid, please log in.'
            )
        }
    }

    return {
        email: token ? token.email : null,
        name: token ? token.name : null
    }
}

module.exports = context