const { collection, prepare } = require('@apland/mongo')
const { ObjectId } = require('mongodb')
const { AuthenticationError, ForbiddenError } = require('apollo-server-micro')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tenantResolver = require('./resolvers-tenant')

// Hash configuration
const BCRYPT_ROUNDS = 12

const resolvers = {
  Query: {
    users: async (obj, args, context) => {
      // Set filter from args
      const filter = args.filter ? args.filter : {}
      // Build sorter
      const sortBy = {}
      if (args.sortBy) {
        sortBy[args.sortBy.field] = args.sortBy.order === 'ASC' ? 1 : -1
      }
      return (await (await collection('users')).find(filter).sort(sortBy).toArray()).map(prepare)
    },
    user: async (obj, args, context) => {
      return prepare(await (await collection('users')).findOne({ _id: ObjectId(args.id) }))
    },
    userSearch: async (obj, args, context) => {
      const filter = { $text: { $search: args.query } }
      // Filter by tenant
      filter.tenant = context.user.tenant
      const field = { score: { $meta: 'textScore' } }
      return (await (await collection('users')).find(filter).project(field).sort(field).toArray()).map(prepare)
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
      let user = prepare(await (await collection('users')).findOne({ email: args.email }))
      if (user) {
        throw new ForbiddenError('User already exists.')
      }

      // Default value
      args.role = args.role ? args.role : 'USER'

      // Hash password
      args.password = await bcrypt.hash(args.password, BCRYPT_ROUNDS)
      args.created = new Date()
      args.created_by = context.user.id
      user = prepare((await (await collection('users')).insertOne(args)).ops[0])

      // Update tenant assigned list
      const filter = { _id: ObjectId(args.tenant) }
      await (await collection('tenants')).updateOne(filter, { $push: { assigned_users: user.id } })
      return user
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
    updateUserPassword: async (obj, args, context) => {
      args.updated = new Date()
      args.updated_by = context.user.id

      if (args.new_password !== args.new_password_repeated) {
        throw new ForbiddenError('New passwords do not match.')
      }

      // Set enw password
      args.password = await bcrypt.hash(args.new_password, BCRYPT_ROUNDS)

      const filter = { _id: ObjectId(context.user.id) }
      return { success: (await (await collection('users')).updateOne(filter, { $set: args })).result.ok }
    },
    deleteUser: async (obj, args, context) => {
      args._id = ObjectId(args.id)
      delete args.id
      return { success: (await (await collection('users')).deleteOne(args)).result.ok }
    },
    deleteCurrentUser: async (obj, args, context) => {
      args._id = ObjectId(context.user.id)
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
      // FIXME: Accessing tenant collection directly
      return tenantResolver.Query.tenant(obj, { id: obj.tenant }, context)
    }
  }
}

module.exports = resolvers
