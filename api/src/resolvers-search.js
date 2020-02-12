const categoryResolvers = require('./resolvers-category')
const tenantResolver = require('./resolvers-tenant')
const stationResolver = require('./resolvers-station')
const documentResolver = require('./resolvers-document')
const userResolver = require('./resolvers-user')

const resolvers = {
  Result: {
    __resolveType (obj, context, info) {
      return obj.type
    }
  },
  Query: {
    search: async (obj, args, context) => {
      // FIXME: Search query bypasses hasRole directive
      var categories = await categoryResolvers.Query.categorySearch(obj, args, context)
      categories = categories.map((obj) => { obj.type = 'Category'; return obj })
      var tenants = await tenantResolver.Query.tenantSearch(obj, args, context)
      tenants = tenants.map((obj) => { obj.type = 'Tenant'; return obj })
      var stations = await stationResolver.Query.stationSearch(obj, args, context)
      stations = stations.map((obj) => { obj.type = 'Station'; return obj })
      var users = await userResolver.Query.userSearch(obj, args, context)
      users = users.map((obj) => { obj.type = 'User'; return obj })
      var documents = await documentResolver.Query.documentSearch(obj, args, context)
      documents = documents.map((obj) => { obj.type = 'Document'; return obj })
      return [...categories, ...tenants, ...stations, ...users, ...documents]
    }
  }
}

module.exports = resolvers
