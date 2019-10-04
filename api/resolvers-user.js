const { collection, prepare } = require('mongo')
const { ObjectId } = require('mongodb')
const { AuthenticationError, ForbiddenError } = require('apollo-server-micro')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tenantResolver = require('./resolvers-tenant')

// Hash configuration
const BCRYPT_ROUNDS = 12

const resolvers = {
  Query: {
    users: async (obj, args, context) => {
      // Set filter from args
      const filter = args
      return (await (await collection('users')).find(filter).toArray()).map(prepare)
    },
    user: async (obj, args, context) => {
      return prepare(await (await collection('users')).findOne({ _id: ObjectId(args.id) }))
    },
    currentUser: async (obj, args, context) => {
      return context.user
    },
    loginUser: async (obj, args, context) => {
      // Find user by email and password
      const user = prepare(await (await collection('users')).findOne({ email: args.email }))

      // Compare hash
      if (user && await bcrypt.compare(args.password, user.password)) {
        // Generate and return JWT token
        const token = jwt.sign({ email: user.email, name: (user.firstname + ' ' + user.lastname) }, process.env.JWT_SECRET, { expiresIn: '7d' })
        return { token: token }
      } else {
        // Throw authentication error
        throw new AuthenticationError('Login failed.')
      }
    }
  },
  Mutation: {
    createUser: async (obj, args, context) => {
      // Check if user already exists
      const user = prepare(await (await collection('users')).findOne({ email: args.email }))
      if (user) {
        throw new ForbiddenError('User already exists.')
      }

      // Default value
      args.role = args.role ? args.role : 'USER'

      // Hash password
      args.password = await bcrypt.hash(args.password, BCRYPT_ROUNDS)
      args.created = new Date()
      args.created_by = context.user.id
      return prepare((await (await collection('users')).insertOne(args)).ops[0])
    },
    updateUser: async (obj, args, context) => {
      args.updated = new Date()
      args.updated_by = context.user.id

      // Hash password if provided
      if (args.password) {
        args.password = await bcrypt.hash(args.password, BCRYPT_ROUNDS)
      }
      const filter = { _id: ObjectId(args.id) }
      delete args.id
      return { success: (await (await collection('users')).updateOne(filter, { $set: args })).result.ok }
    },
    updateUserProfile: async (obj, args, context) => {
      args.updated = new Date()
      args.updated_by = context.user.id

      const filter = { _id: ObjectId(context.user.id) }
      return { success: (await (await collection('users')).updateOne(filter, { $set: args })).result.ok }
    },
    deleteUser: async (obj, args, context) => {
      args._id = ObjectId(args.id)
      delete args.id
      return { success: (await (await collection('users')).deleteOne(args)).result.ok }
    }
  },
  User: {
    // Hide password hash
    password () {
      return ''
    },
    tenant: async (obj, args, context) => {
      return tenantResolver.Query.tenant(obj, { id: obj.tenant }, context)
    }
  }
}

module.exports = resolvers
