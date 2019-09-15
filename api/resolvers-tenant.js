const { collection, prepare } = require('mongo')
const { ObjectId } = require('mongodb')

const resolvers = {
  Query: {
    tenants: async (obj, args, context) => {
      return (await (await collection('tenants')).find({}).toArray()).map(prepare)
    },
    tenant: async (obj, args, context) => {
      return prepare(await (await collection('tenants')).findOne({ _id: ObjectId(args.id) }))
    }
  },
  Mutation: {
    createTenant: async (obj, args, context) => {
      args.created = new Date()
      args.created_by = context.name || 'system'
      return prepare((await (await collection('tenants')).insertOne(args)).ops[0])
    },
    updateTenant: async (obj, args, context) => {
      args.updated = new Date()
      args.updated_by = context.name || 'system'
      const filter = { _id: ObjectId(args.id) }
      delete args.id
      return { success: (await (await collection('tenants')).updateOne(filter, { $set: args })).result.ok }
    },
    deleteTenant: async (obj, args, context) => {
      args._id = ObjectId(args.id)
      delete args.id
      return { success: (await (await collection('tenants')).deleteOne(args)).result.ok }
    }
  }
}

module.exports = resolvers
