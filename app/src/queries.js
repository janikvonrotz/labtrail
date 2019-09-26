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
mutation createStation( $name: String!, $location: String!, $color: Color!) {
  createStation(name: $name, location: $location, color: $color) {
    id
  }
}
`

const UPDATE_STATION = gql`
mutation updateStation($id: ObjectId!, $name: String, $location: String, $color: Color) {
  updateStation(id: $id, name: $name, location: $location, color: $color) {
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
  GET_CATEGORIES,
  GET_CURRENT_USER,
  LOGIN_USER
}
