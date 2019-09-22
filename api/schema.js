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
  stations: [Station] @hasRole(roles: [ADMIN, USER])
  station(id: ObjectId): Station

  categories: [Category]
  category(id: ObjectId): Category

  tenants: [Tenant]
  tenant(id: ObjectId): Tenant

  documents: [Document]
  document(id: ObjectId): Document

  currentUser: User
  users: [User]
  createdBy(id: ObjectId): User
  updatedBy(id: ObjectId): User 
  loginUser(email: String!, password: String!): Token
}

type Mutation {
  createStation(name: String!, location: String!, color: Color!): Station @hasRole(roles: [ADMIN, USER])
  updateStation(id: ObjectId!, name: String, location: String, color: Color): Response
  deleteStation(id: ObjectId!): Response

  createCategory(name: String!): Category @hasRole(roles: [ADMIN, USER])
  updateCategory(id: ObjectId!, name: String): Response
  deleteCategory(id: ObjectId!): Response

  createTenant(name: String!): Tenant @hasRole(roles: [ADMIN, USER])
  updateTenant(id: ObjectId!, name: String): Response
  deleteTenant(id: ObjectId!): Response

  createDocument(title: String!, link: String!, description: String, category: String!, forward: Boolean!): Document @hasRole(roles: [ADMIN, USER])
  updateDocument(id: ObjectId!, title: String, link: String, description: String, category: ObjectId, forward: Boolean): Response
  deleteDocument(id: ObjectId!): Response

  createUser(email: String!, password: String!, firstname: String!, lastname: String!, role: Role): User @hasRole(roles: [ADMIN, USER])
  updateUser(id: ObjectId!, email: String, password: String, firstname: String, lastname: String, role: Role): Response
  deleteUser(id: ObjectId!): Response
}
`

module.exports = typeDefs
