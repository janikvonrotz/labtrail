const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue (value) {
      return new Date(value) // Value from the client
    },
    serialize (value) {
      return value.toUTCString() // Value sent to the client
    },
    // Parse abstract syntax tree
    parseLiteral (ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value) // Ast value is always in string format
      }
      return null
    }
  })
}

module.exports = resolvers
