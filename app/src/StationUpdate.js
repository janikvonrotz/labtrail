import React from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import StationForm from './StationForm'
import StationDelete from './StationDelete'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_STATION, GET_STATIONS, GET_STATION } from './queries'
import { makeStyles } from '@material-ui/core/styles'
import Error from './Error'
import QRCode from 'qrcode.react'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  title: {
    margin: theme.spacing(2, 0)
  }
}))

const StationUpdate = ({ station }) => {
  const classes = useStyles()

  // Get hook for Station update
  const [updateStation, { data, error }] = useMutation(UPDATE_STATION, {
    refetchQueries: [
      {
        query: GET_STATIONS
      },
      {
        query: GET_STATION,
        variables: { id: station.id }
      }
    ]
  })
  // const [createAlert] = useMutation(CREATE_ALERTCLIENT, { variables: { message: 'Station saved!', type: 'SUCCESS' } })

  if (error) return <Error message={error.message} />

  // Redirect if update is successful
  if (data && data.updateStation.success) {
    // createAlert()
    return <Redirect to='/stations' />
  }

  return (
    <>
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
      <Typography className={classes.title} variant='h4' component='h2'>
        QR-Code
      </Typography>
      <QRCode value={`https://labtrail.now.sh/qr/${station.id}`} fgColor={station.color} />
    </>
  )
}

StationUpdate.propTypes = {
  station: PropTypes.object.isRequired
}

export default StationUpdate
