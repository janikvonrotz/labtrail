const { gql } = require('apollo-server-micro')

// GraphQL schema
const typeDefs = gql`

scalar Date

enum Color {
	RED
	GREEN
	BLUE
}
	
type Response {
    success: Boolean!
    message: String
}

type Station {
    id: String!
	name: String!
	location: String!
	color: Color!
	
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
	createStation(name: String!, location: String!, color: Color!): Station
	updateStation(id: String!, name: String, location: String, color: Color): Response
	deleteStation(id: String!): Response
}
`

module.exports = typeDefs
