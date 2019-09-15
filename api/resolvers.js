const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')
const { ObjectId } = require('mongodb')

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
  }),
  ObjectId: new GraphQLScalarType({
    name: 'ObjectId',
    description: 'Mongo object id scalar type',
    parseValue (value) {
      return new ObjectId(value)
    },
    parseLiteral (ast) {
      if (ast.kind === Kind.STRING) {
        return new ObjectId(ast.value)
      }
      return null
    }
  })
}

module.exports = resolvers
