const { gql } = require('apollo-server-micro')

// GraphQL schema
const typeDefs = gql`

scalar Date
	
type Response {
    success: Boolean!
    message: String
}

type Station {
    id: String!
	name: String!
	location: String!
	
	created: Date
	created_by: String!
	updated: Date
	updated_by: String!
}

type Query {
	stations: [Station]
	station(id: String): Station
}

type Mutation {
	createStation(name: String!, location: String!): Station
	updateStation(id: String!, name: String!, location: String!): Response
	deleteStation(id: String!): Response
}
`

module.exports = typeDefs
