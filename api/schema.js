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
  MANAGER
  USER
}

type Response {
  success: Boolean!
  message: String
}

type Category {
  id: String!
  name: String!

  tenant: Tenant!
  created: Date
  created_by: User!
  updated: Date
  updated_by: User!
}

type Tenant {
  id: String
  name: String!

  created: Date
  created_by: User!
  updated: Date
  updated_by: User!
}

type Station {
  id: String!
  name: String!
  location: String!
  color: Color!
  documents: [Document]
  
  tenant: Tenant!
  created: Date
  created_by: User!
  updated: Date
  updated_by: User!
}

type Document {
  id: String!
  title: String!
  link: String!
  description: String
  category: Category
  forward: Boolean!

  tenant: Tenant!
  created: Date
  created_by: User!
  updated: Date
  updated_by: User!
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
  role: Role!

  tenant: Tenant!
  created: Date
  created_by: User!
  updated: Date
  updated_by: User!
}

type Query {
  stations: [Station]
  station(id: String): Station

  categories: [Category] @hasRole(roles: [ADMIN])
  category(id: String): Category @hasRole(roles: [ADMIN])

  tenants: [Tenant] @hasRole(roles: [ADMIN])
  tenant(id: String): Tenant @hasRole(roles: [ADMIN])

  documents: [Document]
  document(id: String): Document

  currentUser: User @hasRole(roles: [USER, ADMIN])
  users: [User] @hasRole(roles: [ADMIN])
  createdBy(id: String): User @hasRole(roles: [ADMIN])
  updatedBy(id: String): User @hasRole(roles: [ADMIN])
  loginUser(email: String!, password: String!): Token
}

type Mutation {
  createStation(name: String!, location: String!, color: Color!, documents: [String]): Station @hasRole(roles: [ADMIN])
  updateStation(id: String!, name: String, location: String, color: Color, documents: [String]): Response @hasRole(roles: [ADMIN])
  deleteStation(id: String!): Response @hasRole(roles: [ADMIN])

  createCategory(name: String!): Category @hasRole(roles: [ADMIN])
  updateCategory(id: String!, name: String): Response @hasRole(roles: [ADMIN])
  deleteCategory(id: String!): Response @hasRole(roles: [ADMIN])

  createTenant(name: String!): Tenant @hasRole(roles: [ADMIN])
  updateTenant(id: String!, name: String): Response @hasRole(roles: [ADMIN])
  deleteTenant(id: String!): Response @hasRole(roles: [ADMIN])

  createDocument(title: String!, link: String!, description: String, category: String!, forward: Boolean!): Document @hasRole(roles: [ADMIN])
  updateDocument(id: String!, title: String, link: String, description: String, category: String, forward: Boolean): Response @hasRole(roles: [ADMIN])
  deleteDocument(id: String!): Response @hasRole(roles: [ADMIN])

  createUser(email: String!, password: String!, firstname: String!, lastname: String!, role: Role, tenant: String!): User @hasRole(roles: [ADMIN])
  updateUser(id: String!, email: String, password: String, firstname: String, lastname: String, role: Role, tenant: String): Response @hasRole(roles: [ADMIN])
  deleteUser(id: String!): Response @hasRole(roles: [ADMIN])
  updateUserProfile(firstname: String, lastname: String, tenant: String): Response @hasRole(roles: [USER,MANAGER,ADMIN])

}
`

module.exports = typeDefs
