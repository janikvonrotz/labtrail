import gql from 'graphql-tag'

const GET_STATION = gql`
query station($id: ObjectId) {
  station(id: $id) {
    id
    name
    location
    color
  }
}
`

const CREATE_STATION = gql`
mutation createStation( $name: String!, $location: String!, $color: Color!, $documents: [ObjectId]) {
  createStation(name: $name, location: $location, color: $color, documents: $documents) {
    id
  }
}
`

const UPDATE_STATION = gql`
mutation updateStation($id: ObjectId!, $name: String, $location: String, $color: Color, $documents: [ObjectId]) {
  updateStation(id: $id, name: $name, location: $location, color: $color, documents: $documents) {
    success
    message
  }
}
`

const DELETE_STATION = gql`
mutation deleteStation( $id: ObjectId!) {
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
query documents($id: ObjectId) {
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
mutation createDocument($title: String!, $link: String!, $description: String, $category: ObjectId!, $forward: Boolean!) {
  createDocument(title: $title, link: $link, description: $description, category: $category, forward: $forward) {
    id
  }
}
`

const UPDATE_DOCUMENT = gql`
mutation updateDocument($id: ObjectId!, $title: String, $link: String, $description: String, $category: ObjectId, $forward: Boolean) {
  updateDocument(id: $id, title: $title, link: $link, description: $description, category: $category, forward: $forward) {
    success
    message
  }
}
`

const DELETE_DOCUMENT = gql`
mutation deleteDocument( $id: ObjectId!) {
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
query category($id: ObjectId) {
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
mutation updateCategory($id: ObjectId!, $name: String) {
  updateCategory(id: $id, name: $name) {
    success
    message
  }
}
`

const DELETE_CATEGORY = gql`
mutation deleteCategory( $id: ObjectId!) {
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

const GET_CURRENT_USER = gql`
{
  currentUser {
    name
    role
  }
}
`

const LOGIN_USER = gql`
query loginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    token
  }
}
`

const GET_ALERTCLIENT = gql`
{
  alert {
    message @client
    type @client
  }
}
`

const CREATE_ALERTCLIENT = gql`
mutation createAlert($message: String!, $type: AlertType!) {
  createAlert(message: $message, type: $type) @client
}
`

const DELETE_CLIENTALERT = gql`
mutation deleteAlert {
  deleteAlert @client
}
`

export {
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
  GET_CURRENT_USER,
  LOGIN_USER,
  GET_ALERTCLIENT,
  CREATE_ALERTCLIENT,
  DELETE_CLIENTALERT
}
