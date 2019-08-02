import React from 'react'
import { Query } from 'react-apollo'
import StationListItem from './StationListItem'
import Error from './Error'
import Loading from './Loading'
import { STATIONS } from './queries'

const SaunaList = () => (
    <Query query={STATIONS}>
        {({ loading, error, data }) => {

            if (loading) return <Loading />
            if (error) return <Error />

            return (
                <div>
                    {data.allStations.map((station) => (
                        <StationListItem key={station._id} station={station} />
                    ))}
                </div>
            )
        }}
    </Query>
)

export default SaunaList