const { collection, prepare } = require('mongo')
const { ObjectId } = require('mongodb')
const categoryResolvers = require('./resolvers-category')

const resolvers = {
  Query: {
    documents: async (obj, args, context) => {
      // Set filter from args
      let filter = {}
      if (args) {
        filter = args
      }
      return (await (await collection('documents')).find(filter).toArray()).map(prepare)
    },
    document: async (obj, args, context) => {
      return prepare(await (await collection('documents')).findOne({ _id: ObjectId(args.id) }))
    }
  },
  Mutation: {
    createDocument: async (obj, args, context) => {
      args.created = new Date()
      args.created_by = context.user.id
      return prepare((await (await collection('documents')).insertOne(args)).ops[0])
    },
    updateDocument: async (obj, args, context) => {
      args.updated = new Date()
      args.updated_by = context.user.id
      const filter = { _id: ObjectId(args.id) }
      delete args.id
      return { success: (await (await collection('documents')).updateOne(filter, { $set: args })).result.ok }
    },
    deleteDocument: async (obj, args, context) => {
      args._id = ObjectId(args.id)
      delete args.id
      return { success: (await (await collection('documents')).deleteOne(args)).result.ok }
    }
  },
  Document: {
    category: async (obj, args, context) => {
      return categoryResolvers.Query.category(obj, { id: obj.category }, context)
    }
  }
}

module.exports = resolvers
