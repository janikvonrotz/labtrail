import React from 'react'
import { Query } from 'react-apollo'
import StationListItem from './StationListItem'
import Error from './Error'
import Loading from './Loading'
import { GET_STATIONS } from './queries'

const SaunaList = () => (
    <Query query={GET_STATIONS}>
        {({ loading, error, data }) => {

            if (loading) return <Loading />
            if (error) return <Error message={error.message} />

            return (
                <>
                    {data.stations.map((station) => (
                        <StationListItem key={station._id} station={station} />
                    ))}
                </>
            )
        }}
    </Query>
)

export default SaunaList
