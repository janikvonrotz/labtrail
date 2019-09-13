import gql from 'graphql-tag'

const GET_STATION = gql`
query station($id: String) {
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
mutation updateStation($id: String!, $name: String, $location: String, $color: Color) {
    updateStation(id: $id, name: $name, location: $location, color: $color) {
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

const GET_CURRENT_USER = gql`
{
    currentUser {
        name
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
  GET_CURRENT_USER,
  LOGIN_USER
}
