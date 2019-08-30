import React from 'react'
import StationListItem from './StationListItem'
import Error from './Error'
import Loading from './Loading'
import { GET_STATIONS } from './queries'
import { useQuery } from '@apollo/react-hooks'

const SaunaList = () => {
  const { loading, error, data } = useQuery(GET_STATIONS)

  if (loading) return <Loading />
  if (error) return <Error message={error.message} />

  return (
    <>
      {data.stations.map((station) => (
        <StationListItem key={station.id} station={station} />
      ))}
    </>
  )
}

export default SaunaList
