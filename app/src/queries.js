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
    allStations {
        id
        name
        location
    }
}
`

export {
GET_STATION,
GET_STATIONS
}
