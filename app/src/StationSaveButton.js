import React from 'react'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_STATION, GET_STATIONS } from './queries'

const StationSaveButton = ({ station }) => {
  const [updateStation, { data }] = useMutation(UPDATE_STATION, {
    refetchQueries: [{
      query: GET_STATIONS
    }]
  })

  // Redirect if update is successful
  if (data && data.updateStation.success) {
    return <Redirect to='/stations' />
  }

  return (
    <Button
      variant='contained'
      color='primary'
      onClick={e => { updateStation({ variables: station }) }}
    >
      Save
    </Button>
  )
}

StationSaveButton.propTypes = {
  station: PropTypes.object
}

export default StationSaveButton
