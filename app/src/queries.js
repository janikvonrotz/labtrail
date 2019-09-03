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

const UPDATE_STATION = gql`
mutation updateStation($id: String!, $name: String, $location: String, $color: Color) {
    updateStation(id: $id, name: $name, location: $location, color: $color) {
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
        firstname
        lastname
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
  UPDATE_STATION,
  GET_STATIONS,
  GET_CURRENT_USER,
  LOGIN_USER
}
