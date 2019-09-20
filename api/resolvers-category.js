const { collection, prepare } = require('mongo')
const { ObjectId } = require('mongodb')
const userResolver = require('./resolvers-user')

const resolvers = {
  Query: {
    categories: async (obj, args, context) => {
      return (await (await collection('categories')).find({}).toArray()).map(prepare)
    },
    category: async (obj, args, context) => {
      return prepare(await (await collection('categories')).findOne({ _id: ObjectId(args.id) }))
    }
  },
  Mutation: {
    createCategory: async (obj, args, context) => {
      args.created = new Date()
      args.created_by = context.user.id
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
      return userResolver.Query.createdBy(obj, { id: obj.created_by }, context)
    },
    updated_by: async (obj, args, context) => {
      return userResolver.Query.updatedBy(obj, { id: obj.updated_by }, context)
    }
  }
}

module.exports = resolvers
