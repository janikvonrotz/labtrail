import React from 'react'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_STATION, GET_STATIONS, CREATE_ALERTCLIENT } from './queries'
import { makeStyles } from '@material-ui/core/styles'
import Prompt from './Prompt'
import { useToggle } from './hooks'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1, 1, 1, 0)
  }
}))

const StationDelete = ({ station }) => {
  const classes = useStyles()

  const [createAlert] = useMutation(CREATE_ALERTCLIENT)
  const [deleteStation, { data }] = useMutation(DELETE_STATION, {
    refetchQueries: [{
      query: GET_STATIONS
    }],
    onCompleted: () => createAlert({ variables: { message: 'Station deleted!', type: 'SUCCESS' } })
  })

  const [active, toggle] = useToggle(false)

  if (data && data.deleteStation.success) {
    return <Redirect to='/stations' />
  }

  return (
    <>
      <Button
        variant='outlined'
        color='secondary'
        type='submit'
        className={classes.button}
        onClick={toggle}
      >
        Delete
      </Button>
      <Prompt
        title='Delete Station'
        content={`Do you really want to delete the station: ${station.name} ?`}
        open={active}
        onSubmit={event => deleteStation({ variables: station })}
        onClose={toggle}
      />
    </>
  )
}

StationDelete.propTypes = {
  station: PropTypes.object.isRequired
}

export default StationDelete
