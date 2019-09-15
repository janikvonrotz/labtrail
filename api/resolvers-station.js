const { collection, prepare } = require('mongo')
const { ObjectId } = require('mongodb')

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
      args.created_by = context.name || 'system'

      // Add new document and return it
      return prepare((await (await collection('stations')).insertOne(args)).ops[0])
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
      return { success: (await (await collection('stations')).updateOne(filter, { $set: args })).result.ok }
    },
    deleteStation: async (obj, args, context) => {
      // Convert id property name
      args._id = ObjectId(args.id)
      delete args.id

      // Return succcess response
      return { success: (await (await collection('stations')).deleteOne(args)).result.ok }
    }
  }
}

module.exports = resolvers
