const { ApolloServer, gql } = require('apollo-server-micro')
const { mongo, prepare } = require('mongo')

// Load environment configuration
require('dotenv').config()

// Function to access stations collection
const stationsCollection = async() => {
	const db = await mongo()
	return await db.collection('stations')
}

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

			// Open database connection, access stations collection and return all items
			return ( await (await stationsCollection()).find({}).toArray()).map(prepare)
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
