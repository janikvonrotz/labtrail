const { collection, prepare } = require('mongo')
const { ObjectId } = require('mongodb')

const resolvers = {
  Query: {
    documents: async (obj, args, context) => {
      return (await (await collection('documents')).find({}).toArray()).map(prepare)
    },
    document: async (obj, args, context) => {
      return prepare(await (await collection('documents')).findOne({ _id: ObjectId(args.id) }))
    }
  },
  Mutation: {
    createDocument: async (obj, args, context) => {
      args.created = new Date()
      args.created_by = context.name || 'system'
      return prepare((await (await collection('documents')).insertOne(args)).ops[0])
    },
    updateDocument: async (obj, args, context) => {
      args.updated = new Date()
      args.updated_by = context.name || 'system'
      const filter = { _id: ObjectId(args.id) }
      delete args.id
      return { success: (await (await collection('documents')).updateOne(filter, { $set: args })).result.ok }
    },
    deleteDocument: async (obj, args, context) => {
      args._id = ObjectId(args.id)
      delete args.id
      return { success: (await (await collection('documents')).deleteOne(args)).result.ok }
    }
  }
}

module.exports = resolvers
