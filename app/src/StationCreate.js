import React from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import StationForm from './StationForm'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_STATION, GET_STATIONS, CREATE_ALERTCLIENT } from './queries'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1, 1, 1, 0)
  }
}))

const StationCreate = () => {
  const classes = useStyles()

  // Set default values
  const station = { name: '', location: '', color: '', documents: [] }

  const [createAlert] = useMutation(CREATE_ALERTCLIENT)
  const [createStation, { data }] = useMutation(CREATE_STATION, {
    refetchQueries: [{
      query: GET_STATIONS
    }],
    onCompleted: () => createAlert({ variables: { message: 'Station created!', type: 'SUCCESS' } })
  })

  // Redirect if update is successful
  if (data && data.createStation.id) {
    return <Redirect to='/stations' />
  }

  return (
    <StationForm station={station} onSubmit={(station) => createStation({ variables: station })}>
      <Link to='/stations'>
        <Button
          variant='outlined'
          color='secondary'
          className={classes.button}
        >
          Cancel
        </Button>
      </Link>
      <Button
        variant='contained'
        color='primary'
        type='submit'
        className={classes.button}
      >
        Add
      </Button>
    </StationForm>
  )
}

StationCreate.propTypes = {
  station: PropTypes.object
}

export default StationCreate
