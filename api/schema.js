const { gql } = require('apollo-server-micro')

// GraphQL schema
const typeDefs = gql`

directive @isAuthenticated on FIELD_DEFINITION
directive @hasRole(roles: [Role!]) on FIELD_DEFINITION

scalar Date

enum Color {
  RED
  GREEN
  BLUE
}

enum Role {
  ADMIN
  USER
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

type Token {
  token: String!
}

type User {
  id: String!
  email: String!
  password: String!
  firstname: String!
  lastname: String!
  name: String
  role: Role!

  created: Date
  created_by: String!
  updated: Date
  updated_by: String!
}

type Query {
  stations: [Station] @hasRole(roles: [USER])
  station(id: String): Station @isAuthenticated
  currentUser: User @isAuthenticated
  users: [User] @isAuthenticated
  loginUser(email: String!, password: String!): Token
}

type Mutation {
  createStation(name: String!, location: String!, color: Color!): Station
  updateStation(id: String!, name: String, location: String, color: Color): Response
  deleteStation(id: String!): Response

  createUser(email: String!, password: String!, firstname: String!, lastname: String!, role: Role): User
  updateUser(id: String!, email: String, password: String, firstname: String, lastname: String, role: Role): Response
  deleteUser(id: String!): Response
}
`

module.exports = typeDefs
