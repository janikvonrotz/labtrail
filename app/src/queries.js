import gql from 'graphql-tag'

module.exports = { STATION: gql`
query station($id: String) {
    station(id: $id) {
        id
        name
        location
    }
}
`
, STATIONS: gql`
{
    allStations {
        id
        name
        location
    }
}
`
}