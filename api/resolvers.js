const { stationsCollection, usersCollection, prepare } = require('mongo')
const { ObjectId } = require('mongodb')
const { GraphQLScalarType } = require('graphql')
const { AuthenticationError, ForbiddenError } = require('apollo-server-micro')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Kind } = require('graphql/language')

// Hash configuration
const BCRYPT_ROUNDS = 12

// Resolve GraphQL queries, mutations and graph paths
const resolvers = {
  Query: {
    stations: async (obj, args, context) => {
      // Open database connection, access stations collection and return all documents
      return (await (await stationsCollection()).find({}).toArray()).map(prepare)
    },
    station: async (obj, args, context) => {
      // Open database connection, access stations collection and return one document
      return prepare(await (await stationsCollection()).findOne({ _id: ObjectId(args.id) }))
    },
    users: async (obj, args, context) => {
      return (await (await usersCollection()).find({}).toArray()).map(prepare)
    },
    currentUser: async (obj, args, context) => {
      return prepare(await (await usersCollection()).findOne({ email: context.email }))
    },
    loginUser: async (obj, args, context) => {
      // Find user by email and password
      const user = prepare(await (await usersCollection()).findOne({ email: args.email }))

      // Compare hash
      if (user && await bcrypt.compare(args.password, user.password)) {
        // Generate and return JWT token
        const token = jwt.sign({ email: user.email, name: (user.firstname + ' ' + user.lastname) }, process.env.JWT_SECRET)
        return { token: token }
      } else {
        // Throw authentication error
        throw new AuthenticationError('Login failed.')
      }
    }
  },
  Mutation: {
    createStation: async (obj, args, context) => {
      // Set default values
      args.created = new Date()
      args.created_by = context.name || 'system'

      // Add new document and return it
      return prepare((await (await stationsCollection()).insertOne(args)).ops[0])
    },
    updateStation: async (obj, args, context) => {
      // Set default values
      args.updated = new Date()
      args.updated_by = context.name || 'system'

      // Create update filter
      const filter = { _id: ObjectId(args.id) }

      // Remove id property
      delete args.id

      // Return success response
      return { success: (await (await stationsCollection()).updateOne(filter, { $set: args })).result.ok }
    },
    deleteStation: async (obj, args, context) => {
      // Convert id property name
      args._id = ObjectId(args.id)
      delete args.id

      // Return succcess response
      return { success: (await (await stationsCollection()).deleteOne(args)).result.ok }
    },
    createUser: async (obj, args, context) => {
      // Check if user already exists
      const user = prepare(await (await usersCollection()).findOne({ email: args.email }))
      if (user) {
        throw new ForbiddenError('User already exists.')
      }

      // Default value
      args.role = args.role ? args.role : 'USER'

      // Hash password
      args.password = await bcrypt.hash(args.password, BCRYPT_ROUNDS)
      args.created = new Date()
      args.created_by = context.name || 'system'
      return prepare((await (await usersCollection()).insertOne(args)).ops[0])
    },
    updateUser: async (obj, args, context) => {
      args.updated = new Date()
      args.updated_by = context.name || 'system'

      // Hash password if provided
      if (args.password) {
        args.password = await bcrypt.hash(args.password, BCRYPT_ROUNDS)
      }
      const filter = { _id: ObjectId(args.id) }
      delete args.id
      return { success: (await (await usersCollection()).updateOne(filter, { $set: args })).result.ok }
    },
    deleteUser: async (obj, args, context) => {
      args._id = ObjectId(args.id)
      delete args.id
      return { success: (await (await usersCollection()).deleteOne(args)).result.ok }
    }
  },
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
  User: {
    // Hide password hash
    password () {
      return ''
    },
    // Generate display name
    name (obj, args, context) {

      // Return name from token if available,
      // otherwise generate from first- and lastname
      if (context.name) {
        return context.name
      } else {
        return (obj.firstname + ' ' + obj.lastname)
      }
    }
  }
}

module.exports = resolvers
