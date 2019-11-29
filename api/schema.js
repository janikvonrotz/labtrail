const { gql } = require('apollo-server-micro')

// GraphQL schema
const typeDefs = gql`
union Result = Category | Document | Station | Tenant | User

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
  id: String!
  name: String!
  assigned_users: [User]
  assigned_category: Category

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
  redirect_document: Document
  
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

type Link {
  url: String
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
  stations: [Station] @hasRole(roles: [ADMIN, MANAGER])
  station(id: String): Station @hasRole(roles: [ADMIN, MANAGER])
  redirectLink(id: String): Link
  stationSearch(query: String): [Station]

  categories: [Category] @hasRole(roles: [ADMIN, MANAGER])
  category(id: String): Category @hasRole(roles: [ADMIN, MANAGER])
  categorySearch(query: String): [Category]

  tenants: [Tenant] @hasRole(roles: [ADMIN])
  tenant(id: String): Tenant @hasRole(roles: [ADMIN])
  assignedTenants: [Tenant] @hasRole(roles: [USER, MANAGER, ADMIN])
  tenantSearch(query: String): [Tenant]

  documents: [Document] @hasRole(roles: [ADMIN, MANAGER])
  document(id: String): Document @hasRole(roles: [ADMIN, MANAGER])
  documentSearch(query: String): [Document]

  currentUser: User @hasRole(roles: [USER, MANAGER, ADMIN])
  users: [User] @hasRole(roles: [ADMIN])
  user(id: String): User @hasRole(roles: [ADMIN])
  createdBy(id: String): User @hasRole(roles: [ADMIN])
  updatedBy(id: String): User @hasRole(roles: [ADMIN])
  loginUser(email: String!, password: String!): Token
  userSearch(query: String): [User]

  search(query: String): [Result] @hasRole(roles: [USER, MANAGER, ADMIN])
}

type Mutation {
  createStation(
    name: String!, 
    location: String!, 
    color: Color!, 
    documents: [String]
  ): Station @hasRole(roles: [ADMIN, MANAGER])
  updateStation(
    id: String!, 
    name: String, 
    location: String, 
    color: Color, 
    documents: [String]
  ): Response @hasRole(roles: [ADMIN, MANAGER])
  deleteStation(id: String!): Response @hasRole(roles: [ADMIN, MANAGER])

  createCategory(name: String!): Category @hasRole(roles: [ADMIN, MANAGER])
  updateCategory(
    id: String!, 
    name: String
  ): Response @hasRole(roles: [ADMIN, MANAGER])
  deleteCategory(id: String!): Response @hasRole(roles: [ADMIN, MANAGER])

  createTenant(name: String!): Tenant @hasRole(roles: [ADMIN])
  updateTenant(
    id: String!,
    name: String
  ): Response @hasRole(roles: [ADMIN])
  deleteTenant(id: String!): Response @hasRole(roles: [ADMIN])
  assignTenant(
    id: String!, 
    user: String!
  ): Response @hasRole(roles: [ADMIN])
  assignCategory(
    category: String!
  ): Response @hasRole(roles: [MANAGER, ADMIN])

  createDocument(
    title: String!,
    link: String!,
    description: String,
    category: String!,
    forward: Boolean!
  ): Document @hasRole(roles: [ADMIN, MANAGER])
  updateDocument(
    id: String!,
    title: String,
    link: String,
    description: String,
    category: String,
    forward: Boolean
  ): Response @hasRole(roles: [ADMIN, MANAGER])
  deleteDocument(id: String!): Response @hasRole(roles: [ADMIN, MANAGER])

  createUser(
    email: String!,
    password: String!,
    firstname: String!,
    lastname: String!,
    role: Role,
    tenant: String!
  ): User @hasRole(roles: [ADMIN])
  updateUser(
    id: String!,
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    role: Role,
    tenant: String
  ): Response @hasRole(roles: [ADMIN])
  deleteUser(id: String!): Response @hasRole(roles: [ADMIN])
  deleteCurrentUser: Response @hasRole(roles: [USER,MANAGER,ADMIN])
  updateUserProfile(
    firstname: String,
    lastname: String,
    tenant: String,
  ): Response @hasRole(roles: [USER,MANAGER,ADMIN])

  updateUserPassword(
    new_password: String,
    new_password_repeated: String
  ): Response @hasRole(roles: [USER,MANAGER,ADMIN])

}
`

module.exports = typeDefs
