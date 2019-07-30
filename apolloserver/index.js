const { ApolloServer, gql } = require('apollo-server-micro')
const { mongo, prepare } = require('mongo')

// Load environment configuration
require('dotenv').config()

// Declare mongo collection variables
var stations

// Call mongo async function
(async function() {
	
	// Establish database connection
	const db = await mongo()

	// Access collection
	stations = db.collection('stations')
})()

// GraphQL schema
const typeDefs = gql`

scalar Date
	
type Response {
    success: Boolean
    message: String
}

type Station {
    id: String!
    name: String!
}

type Query {
	stations: [Station]
}
`

// Resolve GraphQL queries
const resolvers = {
	Query: {
		stations: async (root, args, context) => {
			return (await stations.find({}).toArray()).map(prepare)
		}
	}
}

// Initialize Apollo server
const server = new ApolloServer({
	typeDefs,
	resolvers,
	introspection: true,
	playground: true
})

// Export server as handler
module.exports = server.createHandler()
