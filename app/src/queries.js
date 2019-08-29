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

const GET_PROFILE = gql`
{
    me {
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
    GET_PROFILE,
    LOGIN_USER
}
