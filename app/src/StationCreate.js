import React from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import StationForm from './StationForm'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_STATION, GET_STATIONS } from './queries'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}))

const StationCreate = ({ station }) => {
  const classes = useStyles()

  const defaultStation = { name: '', location: '', color: '' }

  const [createStation, { data }] = useMutation(CREATE_STATION, {
    refetchQueries: [{
      query: GET_STATIONS
    }]
  })

  // Redirect if update is successful
  if (data && data.createStation.id) {
    return <Redirect to='/stations' />
  }

  return (
    <StationForm station={defaultStation} onSubmit={(station) => createStation({ variables: station })}>
      <Link to='/stations'>
        <Button
          variant='contained'
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
  station: PropTypes.object.isRequired
}

export default StationCreate
