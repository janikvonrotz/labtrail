const { gql } = require('apollo-server-micro')

// GraphQL schema
const typeDefs = gql`

directive @isAuthenticated on FIELD_DEFINITION
directive @hasRole(roles: [Role!]) on OBJECT | FIELD_DEFINITION

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

type Station @hasRole(roles: [ANONYMOUS, ADMIN, USER]) {
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
  stations: [Station]
  station(id: ObjectId): Station

  categories: [Category]
  category(id: ObjectId): Category

  tenants: [Tenant]
  tenant(id: ObjectId): Tenant

  documents: [Document]
  document(id: ObjectId): Document

  currentUser: User
  users: [User]
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
