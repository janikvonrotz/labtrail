import gql from 'graphql-tag'

const GET_TENANT = gql`
query tenant($id: String) {
  tenant(id: $id) {
    id
    name
    assigned_users {
      id
      firstname
      lastname
      email
    }
  }
}
`

const CREATE_TENANT = gql`
mutation createTenant( $name: String!) {
  createTenant(name: $name) {
    id
  }
}
`

const UPDATE_TENANT = gql`
mutation updateTenant(
    $id: String!
    $name: String
    $assigned_users: [String]
  ) {
  updateTenant(
    id: $id
    name: $name
    assigned_users: $assigned_users
  ) {
    success
    message
  }
}
`

const DELETE_TENANT = gql`
mutation deleteTenant( $id: String!) {
  deleteTenant(id: $id) {
    success
    message
  }
}
`

const GET_TENANTS = gql`
query tenants ( $sortBy: SortBy) {
  tenants (sortBy: $sortBy) {
    id
    name
    assigned_category {
      id
      name
    }
  }
}
`

const GET_ASSIGNEDTENANTS = gql`
{
  assignedTenants {
    id
    name
  }
}
`

const ASSIGN_CATEGORY = gql`
mutation assignCategory($category: String!) {
  assignCategory(category: $category) {
    success
    message
  }
}
`

const GET_STATION = gql`
query station($id: String) {
  station(id: $id) {
    id
    name
    location
    color
    documents {
      id
      title
      description
      category {
        id
        name
      }
    },
    redirect_document {
      link
    }
  }
}
`

const CREATE_STATION = gql`
mutation createStation(
  $name: String!
  $location: String!
  $color: Color!
  $documents: [String]
) {
  createStation(
    name: $name
    location: $location
    color: $color
    documents: $documents
   ) {
    id
  }
}
`

const UPDATE_STATION = gql`
mutation updateStation(
    $id: String!
    $name: String
    $location: String
    $color: Color
    $documents: [String]
  ) {
  updateStation(
    id: $id
    name: $name
    location: $location
    color: $color
    documents: $documents
  ) {
    success
    message
  }
}
`

const DELETE_STATION = gql`
mutation deleteStation( $id: String!) {
  deleteStation(id: $id) {
    success
    message
  }
}
`

const GET_STATIONS = gql`
{
  stations {
    id
    name
    location
    color
  }
}
`

const GET_DOCUMENT = gql`
query documents($id: String) {
  document(id: $id) {
    id
    title
    link
    description
    category {
      id
      name
    }
    forward
  }
}
`

const CREATE_DOCUMENT = gql`
mutation createDocument(
  $title: String!
  $link: String! 
  $description: String
  $category: String!
  $forward: Boolean!
) {
  createDocument(
    title: $title
    link: $link
    description: $description
    category: $category
    forward: $forward
  ) {
    id
  }
}
`

const UPDATE_DOCUMENT = gql`
mutation updateDocument(
  $id: String!
  $title: String
  $link: String
  $description: String
  $category: String
  $forward: Boolean
) {
  updateDocument(
    id: $id
    title: $title
    link: $link
    description: $description
    category: $category
    forward: $forward
  ) {
    success
    message
  }
}
`

const DELETE_DOCUMENT = gql`
mutation deleteDocument( $id: String!) {
  deleteDocument(id: $id) {
    success
    message
  }
}
`

const GET_DOCUMENTS = gql`
{
  documents {
    id
    title
    link
    description
    category {
      id
      name
    }
    forward
  }
}
`

const GET_CATEGORY = gql`
query category($id: String) {
  category(id: $id) {
    id
    name
  }
}
`

const CREATE_CATEGORY = gql`
mutation createCategory( $name: String!) {
  createCategory(name: $name) {
    id
  }
}
`

const UPDATE_CATEGORY = gql`
mutation updateCategory($id: String!, $name: String) {
  updateCategory(id: $id, name: $name) {
    success
    message
  }
}
`

const DELETE_CATEGORY = gql`
mutation deleteCategory( $id: String!) {
  deleteCategory(id: $id) {
    success
    message
  }
}
`

const GET_CATEGORIES = gql`
{
  categories {
    id
    name
  }
}
`

const CREATE_USER = gql`
mutation createUser(
  $firstname: String!
  $lastname: String! 
  $email: String!
  $password: String!
  $role: Role!
  $tenant: String!
) {
  createUser(
    firstname: $firstname
    lastname: $lastname
    email: $email
    password: $password
    role: $role
    tenant: $tenant
  ) {
    id
  }
}
`

const UPDATE_USER = gql`
mutation updateUser(
  $id: String!
  $email: String
  $password: String
  $firstname: String
  $lastname: String
  $role: Role
  $tenant: String
) {
  updateUser(
    id: $id
    firstname: $firstname
    lastname: $lastname
    email: $email
    password: $password
    role: $role
    tenant: $tenant
  ) {
    success
    message
  }
}
`

const DELETE_USER = gql`
mutation deleteUser( $id: String!) {
  deleteUser(id: $id) {
    success
    message
  }
}
`

const DELETE_CURRENT_USER = gql`
mutation deleteCurrentUser {
  deleteCurrentUser {
    success
    message
  }
}
`

const GET_USER = gql`
query user($id: String) {
  user(id: $id) {
    id
    email
    password
    firstname
    lastname
    role
    tenant {
      id
      name
    }
  }
}
`

const GET_USERS = gql`
{
  users {
    id
    email
    firstname
    lastname
    role
    tenant {
      id
      name
    }
  }
}
`

const GET_CURRENT_USER = gql`
{
  currentUser {
    id
    firstname
    lastname
    role
    tenant {
      id
      name
      assigned_category {
        id
        name
      }
    }
  }
}
`

const LOGIN_USER = gql`
query loginUser(
  $email: String!
  $password: String!
) {
  loginUser(
    email: $email
    password: $password
  ) {
    token
  }
}
`

const UPDATE_USER_PROFILE = gql`
mutation updateUserProfile(
  $firstname: String
  $lastname: String
  $tenant: String
) {
  updateUserProfile(
    firstname: $firstname
    lastname: $lastname
    tenant: $tenant
  ) {
    success
    message
  }
}
`

const UPDATE_USER_PASSWORD = gql`
mutation updateUserPassword(
  $new_password: String!
  $new_password_repeated: String!
) {
  updateUserPassword(
    new_password: $new_password,
    new_password_repeated: $new_password_repeated
  ) {
    success
    message
  }
}
`

const GET_ALERTCLIENT = gql`
{
  alert @client {
    message
    type
  }
}
`

const CREATE_ALERTCLIENT = gql`
mutation createAlert(
  $message: String!
  $type: AlertType!
) {
  createAlert(
    message: $message
    type: $type
  ) @client
}
`

const DELETE_CLIENTALERT = gql`
mutation deleteAlert {
  deleteAlert @client
}
`

const SEARCH = gql`
query search(
  $query: String
) {
  search(query: $query) {
    __typename
    ... on Category {
      id
      name
    }
    ... on Tenant {
      id
      name
    }
    ... on Station {
      id
      name
      location
    }
    ... on Document {
      id
      title
    }
    ... on User {
      id
      firstname
      lastname
      email
    }
  }
}
`

export {
  GET_TENANT,
  CREATE_TENANT,
  UPDATE_TENANT,
  DELETE_TENANT,
  GET_TENANTS,
  GET_ASSIGNEDTENANTS,
  ASSIGN_CATEGORY,
  GET_STATION,
  CREATE_STATION,
  UPDATE_STATION,
  DELETE_STATION,
  GET_STATIONS,
  GET_DOCUMENT,
  CREATE_DOCUMENT,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
  GET_DOCUMENTS,
  GET_CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  DELETE_CURRENT_USER,
  GET_USER,
  GET_USERS,
  GET_CURRENT_USER,
  LOGIN_USER,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PASSWORD,
  GET_ALERTCLIENT,
  CREATE_ALERTCLIENT,
  DELETE_CLIENTALERT,
  SEARCH
}
