import React from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import StationForm from './StationForm'
import StationDelete from './StationDelete'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_STATION, GET_STATIONS } from './queries'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}))

const StationUpdate = ({ station }) => {
  const classes = useStyles()

  // Get hook for Station update
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
    <StationForm station={station} onSubmit={(station) => updateStation({ variables: station })}>
      <Link to='/stations'>
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
        >
          Cancel
        </Button>
      </Link>
      <StationDelete station={station} />
      <Button
        variant='contained'
        color='primary'
        type='submit'
        className={classes.button}
      >
        Save
      </Button>
    </StationForm>
  )
}

StationUpdate.propTypes = {
  station: PropTypes.object.isRequired
}

export default StationUpdate
