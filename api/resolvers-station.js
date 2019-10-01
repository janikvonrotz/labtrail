const { collection, prepare } = require('mongo')
const { ObjectId } = require('mongodb')
const documentResolver = require('./resolvers-document')

// Resolve GraphQL queries, mutations and graph paths
const resolvers = {
  Query: {
    stations: async (obj, args, context) => {
      // Open database connection, access stations collection and return all documents
      return (await (await collection('stations')).find({}).toArray()).map(prepare)
    },
    station: async (obj, args, context) => {
      // Open database connection, access stations collection and return one document
      return prepare(await (await collection('stations')).findOne({ _id: ObjectId(args.id) }))
    }
  },
  Mutation: {
    createStation: async (obj, args, context) => {
      // Set default values
      args.created = new Date()
      args.created_by = context.user.id

      // Add new document and return it
      return prepare((await (await collection('stations')).insertOne(args)).ops[0])
    },
    updateStation: async (obj, args, context) => {
      // Set default values
      args.updated = new Date()
      args.updated_by = context.user.id

      // Create update filter
      const filter = { _id: ObjectId(args.id) }

      // Remove id property
      delete args.id

      console.log(args)

      // Return success response
      return { success: (await (await collection('stations')).updateOne(filter, { $set: args })).result.ok }
    },
    deleteStation: async (obj, args, context) => {
      // Convert id property name
      args._id = ObjectId(args.id)
      delete args.id

      // Return succcess response
      return { success: (await (await collection('stations')).deleteOne(args)).result.ok }
    }
  },
  Station: {
    documents: async (obj, args, context) => {
      // Return document object searched by id in documents array
      const ids = obj.documents.map((id) => (ObjectId(id)))
      return documentResolver.Query.documents(obj, { _id: { $in: ids } }, context)
    }
  }
}

module.exports = resolvers
