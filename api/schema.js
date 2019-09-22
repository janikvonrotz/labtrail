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
}

type Response {
  success: Boolean!
  message: String
}

type Category {
  id: ObjectId!
  name: String!

  created: Date
  created_by: User!
  updated: Date
  updated_by: User!
}

type Tenant {
  id: ObjectId
  name: String!

  created: Date
  created_by: User!
  updated: Date
  updated_by: User!
}

type Station {
  id: ObjectId!
  name: String!
  location: String!
  color: Color!
  
  created: Date
  created_by: User!
  updated: Date
  updated_by: User!
}

type Document {
  id: ObjectId!
  title: String!
  link: String!
  description: String
  category: Category!
  forward: Boolean!

  created: Date
  created_by: User!
  updated: Date
  updated_by: User!
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
  created_by: User!
  updated: Date
  updated_by: User!
}

type Query {
  stations: [Station]
  station(id: ObjectId): Station

  categories: [Category] @hasRole(roles: [ADMIN])
  category(id: ObjectId): Category @hasRole(roles: [ADMIN])

  tenants: [Tenant] @hasRole(roles: [ADMIN])
  tenant(id: ObjectId): Tenant @hasRole(roles: [ADMIN])

  documents: [Document]
  document(id: ObjectId): Document

  currentUser: User @hasRole(roles: [USER, ADMIN])
  users: [User] @hasRole(roles: [ADMIN])
  createdBy(id: ObjectId): User @hasRole(roles: [ADMIN])
  updatedBy(id: ObjectId): User @hasRole(roles: [ADMIN])
  loginUser(email: String!, password: String!): Token
}

type Mutation {
  createStation(name: String!, location: String!, color: Color!): Station @hasRole(roles: [ADMIN])
  updateStation(id: ObjectId!, name: String, location: String, color: Color): Response @hasRole(roles: [ADMIN])
  deleteStation(id: ObjectId!): Response @hasRole(roles: [ADMIN])

  createCategory(name: String!): Category @hasRole(roles: [ADMIN])
  updateCategory(id: ObjectId!, name: String): Response @hasRole(roles: [ADMIN])
  deleteCategory(id: ObjectId!): Response @hasRole(roles: [ADMIN])

  createTenant(name: String!): Tenant @hasRole(roles: [ADMIN])
  updateTenant(id: ObjectId!, name: String): Response @hasRole(roles: [ADMIN])
  deleteTenant(id: ObjectId!): Response @hasRole(roles: [ADMIN])

  createDocument(title: String!, link: String!, description: String, category: String!, forward: Boolean!): Document @hasRole(roles: [ADMIN])
  updateDocument(id: ObjectId!, title: String, link: String, description: String, category: ObjectId, forward: Boolean): Response @hasRole(roles: [ADMIN])
  deleteDocument(id: ObjectId!): Response @hasRole(roles: [ADMIN])

  createUser(email: String!, password: String!, firstname: String!, lastname: String!, role: Role): User @hasRole(roles: [ADMIN])
  updateUser(id: ObjectId!, email: String, password: String, firstname: String, lastname: String, role: Role): Response @hasRole(roles: [ADMIN])
  deleteUser(id: ObjectId!): Response @hasRole(roles: [ADMIN])
}
`

module.exports = typeDefs
