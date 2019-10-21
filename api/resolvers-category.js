const { collection, prepare } = require('mongo')
const { ObjectId } = require('mongodb')
const userResolver = require('./resolvers-user')
const tenantResolver = require('./resolvers-tenant')

const resolvers = {
  Query: {
    categories: async (obj, args, context) => {
      const filter = {}
      // Filter by tenant if user is logged in
      if (context.user && context.user.tenant) {
        filter.tenant = context.user.tenant
      }
      return (await (await collection('categories')).find(filter).toArray()).map(prepare)
    },
    categorySearch: async (obj, args, context) => {
      const filter = { $text: { $search: args.query } }
      const field = { score: { $meta: 'textScore' } }
      return (await (await collection('categories')).find(filter).project(field).sort(field).toArray()).map(prepare)
    },
    category: async (obj, args, context) => {
      const filter = { _id: ObjectId(args.id) }
      // Filter by tenant if user is logged in
      if (context.user && context.user.tenant) {
        filter.tenant = context.user.tenant
      }
      return prepare(await (await collection('categories')).findOne(filter))
    }
  },
  Mutation: {
    createCategory: async (obj, args, context) => {
      args.created = new Date()
      args.created_by = context.user.id
      args.tenant = context.user.tenant
      return prepare((await (await collection('categories')).insertOne(args)).ops[0])
    },
    updateCategory: async (obj, args, context) => {
      args.updated = new Date()
      args.updated_by = context.user.id
      const filter = { _id: ObjectId(args.id) }
      delete args.id
      return { success: (await (await collection('categories')).updateOne(filter, { $set: args })).result.ok }
    },
    deleteCategory: async (obj, args, context) => {
      args._id = ObjectId(args.id)
      delete args.id
      return { success: (await (await collection('categories')).deleteOne(args)).result.ok }
    }
  },
  Category: {
    created_by: async (obj, args, context) => {
      return userResolver.Query.user(obj, { id: obj.created_by }, context)
    },
    updated_by: async (obj, args, context) => {
      return userResolver.Query.user(obj, { id: obj.updated_by }, context)
    },
    tenant: async (obj, args, context) => {
      return tenantResolver.Query.tenant(obj, { id: obj.tenant }, context)
    }
  }
}

module.exports = resolvers
