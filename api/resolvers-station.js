const { collection, prepare } = require('mongo')
const { ObjectId } = require('mongodb')
const documentResolver = require('./resolvers-document')
const userResolver = require('./resolvers-user')
const tenantResolver = require('./resolvers-tenant')

// Resolve GraphQL queries, mutations and graph paths
const resolvers = {
  Query: {
    stations: async (obj, args, context) => {
      const filter = {}
      // Filter by tenant if user is logged in
      if (context.user && context.user.tenant) {
        filter.tenant = context.user.tenant
      }
      // Open database connection, access stations collection and return all documents
      return (await (await collection('stations')).find(filter).toArray()).map(prepare)
    },
    station: async (obj, args, context) => {
      const filter = { _id: ObjectId(args.id) }
      // Filter by tenant if user is logged in
      if (context.user && context.user.tenant) {
        filter.tenant = context.user.tenant
      }
      // Open database connection, access stations collection and return one document
      return prepare(await (await collection('stations')).findOne(filter))
    },
    stationSearch: async (obj, args, context) => {
      const filter = { $text: { $search: args.query } }
      if (context.user && context.user.tenant) {
        filter.tenant = context.user.tenant
      }
      const field = { score: { $meta: 'textScore' } }
      return (await (await collection('stations')).find(filter).project(field).sort(field).toArray()).map(prepare)
    },
    redirectLink: async (obj, args, context) => {
      // Get station
      const station = prepare(await (await collection('stations')).findOne({ _id: ObjectId(args.id) }))
      // Get tenant of station without context
      const tenant = await tenantResolver.Query.tenant(obj, { id: station.tenant }, {})
      // Get documents from station and filter by tenant category
      if (tenant.assigned_category) {
        const ids = station.documents ? station.documents.map((id) => (ObjectId(id))) : []
        // Get documents without context
        const documents = await documentResolver.Query.documents(obj, { _id: { $in: ids }, category: tenant.assigned_category }, {})
        return documents ? { url: documents[0].link } : null
      } else {
        return null
      }
    }
  },
  Mutation: {
    createStation: async (obj, args, context) => {
      // Set default values
      args.created = new Date()
      args.created_by = context.user.id
      args.tenant = context.user.tenant

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
      const ids = obj.documents ? obj.documents.map((id) => (ObjectId(id))) : []
      return documentResolver.Query.documents(obj, { _id: { $in: ids } }, context)
    },
    created_by: async (obj, args, context) => {
      return userResolver.Query.user(obj, { id: obj.created_by }, context)
    },
    updated_by: async (obj, args, context) => {
      return userResolver.Query.user(obj, { id: obj.updated_by }, context)
    },
    tenant: async (obj, args, context) => {
      return tenantResolver.Query.tenant(obj, { id: obj.tenant }, context)
    },
    redirect_document: async (obj, args, context) => {
      // Get tenant of station
      const tenant = await tenantResolver.Query.tenant(obj, { id: obj.tenant }, context)
      // Get documents from station and filter by tenant category
      if (tenant.assigned_category) {
        const ids = obj.documents ? obj.documents.map((id) => (ObjectId(id))) : []
        const documents = await documentResolver.Query.documents(obj, { _id: { $in: ids }, category: tenant.assigned_category }, context)
        return documents ? documents[0] : null
      } else {
        return null
      }
    }
  }
}

module.exports = resolvers
