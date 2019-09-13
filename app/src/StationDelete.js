import React from 'react'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_STATION, GET_STATIONS } from './queries'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}))

const StationDelete = ({ station }) => {
  const classes = useStyles()

  const [deleteStation, { data }] = useMutation(DELETE_STATION, {
    refetchQueries: [{
      query: GET_STATIONS
    }]
  })

  if (data && data.deleteStation.success) {
    return <Redirect to='/stations' />
  }

  return (
    <Button
      variant='contained'
      color='secondary'
      type='submit'
      className={classes.button}
      onClick={event => deleteStation({ variables: station })}
    >
      Delete
    </Button>
  )
}

StationDelete.propTypes = {
  station: PropTypes.object.isRequired
}

export default StationDelete
