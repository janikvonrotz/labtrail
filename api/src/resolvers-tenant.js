const { collection, prepare } = require('@apland/mongo')
const { ObjectId } = require('mongodb')
const categoryResolvers = require('./resolvers-category')
// FIXME: const userResolver = require('./resolvers-user') is not possible as this would result in a require loop

const resolvers = {
  Query: {
    tenants: async (obj, args, context) => {
      // Set filter from args
      const filter = args.filter ? args.filter : {}
      // Build sorter
      const sortBy = {}
      if (args.sortBy) {
        sortBy[args.sortBy.field] = args.sortBy.order === 'ASC' ? 1 : -1
      }
      return (await (await collection('tenants')).find(filter).sort(sortBy).toArray()).map(prepare)
    },
    tenantSearch: async (obj, args, context) => {
      const filter = { $text: { $search: args.query } }
      // Find tenants which are assigned to user from context
      filter.assigned_users = context.user.id
      const field = { score: { $meta: 'textScore' } }
      return (await (await collection('tenants')).find(filter).project(field).sort(field).toArray()).map(prepare)
    },
    tenant: async (obj, args, context) => {
      return prepare(await (await collection('tenants')).findOne({ _id: ObjectId(args.id) }))
    },
    assignedTenants: async (obj, args, context) => {
      // Find tenants which are assigned to user from context
      return (await (await collection('tenants')).find({ assigned_users: context.user.id }).toArray()).map(prepare)
    }
  },
  Mutation: {
    createTenant: async (obj, args, context) => {
      args.created = new Date()
      args.created_by = context.user.id
      return prepare((await (await collection('tenants')).insertOne(args)).ops[0])
    },
    updateTenant: async (obj, args, context) => {
      args.updated = new Date()
      args.updated_by = context.user.id
      const filter = { _id: ObjectId(args.id) }
      delete args.id
      return { success: (await (await collection('tenants')).updateOne(filter, { $set: args })).result.ok }
    },
    deleteTenant: async (obj, args, context) => {
      args._id = ObjectId(args.id)
      delete args.id
      return { success: (await (await collection('tenants')).deleteOne(args)).result.ok }
    },
    assignTenant: async (obj, args, context) => {
      args.updated = new Date()
      args.updated_by = context.user.id
      const filter = { _id: ObjectId(args.id) }
      return { success: (await (await collection('tenants')).updateOne(filter, { $push: { assigned_users: args.user } })).result.ok }
    },
    assignCategory: async (obj, args, context) => {
      args.updated = new Date()
      args.updated_by = context.user.id
      const filter = { _id: ObjectId(context.user.tenant) }
      return { success: (await (await collection('tenants')).updateOne(filter, { $set: { assigned_category: args.category } })).result.ok }
    }
  },
  Tenant: {
    created_by: () => ({}),
    updated_by: () => ({}),
    assigned_users: async (obj, args, context) => {
      const ids = obj.assigned_users ? obj.assigned_users.map(id => ObjectId(id)) : []
      // FIXME: Accessing user collection directly
      return (await (await collection('users')).find({ _id: { $in: ids } }).toArray()).map(prepare)
    },
    assigned_category: async (obj, args, context) => {
      // FIXME: Accessing category collection directly
      return categoryResolvers.Query.category(obj, { id: obj.assigned_category }, context)
    }
  }
}

module.exports = resolvers
