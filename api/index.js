const { ApolloServer } = require('apollo-server-micro')
const cors = require('micro-cors')()
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const context = require('./context')
const directives = require('./directives')

// Load environment configuration
require('dotenv').config()

// // Mock schema if server is in dev mode
// if(process.env.NODE_ENV == 'development') {

// 	// Make a GraphQL schema with no resolvers
// 	const schema = makeExecutableSchema({ typeDefs: typeDefs })

// 	// Add mocks, modifies schema in place
// 	addMockFunctionsToSchema({ 
// 		schema,
// 		mocks: {
// 			Date: () => {
// 				return new Date()
// 			}
// 		}
// 	})
// }

// Initialize Apollo server
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: context,
	introspection: true,
	playground: true,
	schemaDirectives: directives
})

// Export server as handler
module.exports = cors((req, res) => {

	// Workaround abort on Options method 
    if (req.method === 'OPTIONS') {
		res.end()
		return
    }
    return server.createHandler({ path: '/api' })(req, res)
})