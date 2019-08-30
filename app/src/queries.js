import gql from 'graphql-tag'

const GET_STATION = gql`
query station($id: String) {
    station(id: $id) {
        id
        name
        location
    }
}
`

const GET_STATIONS = gql`
{
    stations {
        id
        name
        location
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
  GET_STATIONS,
  GET_CURRENT_USER,
  LOGIN_USER
}
