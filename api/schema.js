const { gql } = require('apollo-server-micro')

// GraphQL schema
const typeDefs = gql`

directive @isAuthenticated on FIELD_DEFINITION
directive @hasRole(roles: [Role!]) on FIELD_DEFINITION

scalar Date
scalar ObjectId

enum Color {
  RED
  GREEN
  BLUE
}

enum Role {
  ADMIN
  USER
  ANONYMOUS
}

type Response {
  success: Boolean!
  message: String
}

type Category {
  id: ObjectId!
  name: String!

  created: Date
  created_by: String!
  updated: Date
  updated_by: String!
}

type Tenant {
  id: ObjectId
  name: String!

  created: Date
  created_by: String!
  updated: Date
  updated_by: String!
}

type Station {
  id: ObjectId!
  name: String!
  location: String!
  color: Color!
  
  created: Date
  created_by: String!
  updated: Date
  updated_by: String!
}

type Document {
  id: ObjectId!
  title: String!
  link: String!
  description: String
  category: Category!
  forward: Boolean!

  created: Date
  created_by: String!
  updated: Date
  updated_by: String!
}

type Token {
  token: String!
}

type User {
  id: ObjectId!
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
  station(id: ObjectId): Station @isAuthenticated

  categories: [Category] @hasRole(roles: [USER])
  category(id: ObjectId): Category @isAuthenticated

  tenants: [Tenant] @hasRole(roles: [ANONYMOUS])
  tenant(id: ObjectId): Tenant @isAuthenticated

  documents: [Document] @hasRole(roles: [USER])
  document(id: ObjectId): Document @isAuthenticated

  currentUser: User @isAuthenticated
  users: [User] @isAuthenticated
  loginUser(email: String!, password: String!): Token
}

type Mutation {
  createStation(name: String!, location: String!, color: Color!): Station
  updateStation(id: ObjectId!, name: String, location: String, color: Color): Response
  deleteStation(id: ObjectId!): Response

  createCategory(name: String!): Category
  updateCategory(id: ObjectId!, name: String): Response
  deleteCategory(id: ObjectId!): Response

  createTenant(name: String!): Tenant
  updateTenant(id: ObjectId!, name: String): Response
  deleteTenant(id: ObjectId!): Response

  createDocument(title: String!, link: String!, description: String, category: String!, forward: Boolean!): Document
  updateDocument(id: ObjectId!, title: String, link: String, description: String, category: String, forward: Boolean): Response
  deleteDocument(id: ObjectId!): Response

  createUser(email: String!, password: String!, firstname: String!, lastname: String!, role: Role): User
  updateUser(id: ObjectId!, email: String, password: String, firstname: String, lastname: String, role: Role): Response
  deleteUser(id: ObjectId!): Response
}
`

module.exports = typeDefs
