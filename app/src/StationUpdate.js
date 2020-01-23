import React from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import StationForm from './StationForm'
import StationDelete from './StationDelete'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_STATION, GET_STATIONS, GET_STATION, CREATE_ALERTCLIENT } from './queries'
import { makeStyles } from '@material-ui/core/styles'
import Error from './Error'
import QRCode from 'qrcode.react'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(2, 0)
  },
  paragraph: {
    wordWrap: 'break-word'
  },
  button: {
    margin: theme.spacing(1, 1, 1, 0)
  }
}))

const StationUpdate = ({ station }) => {
  const classes = useStyles()

  const [createAlert] = useMutation(CREATE_ALERTCLIENT)

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
    ],
    onCompleted: () => createAlert({ variables: { message: 'Station saved!', type: 'SUCCESS' } })
  })

  if (error) return <Error message={error.message} />

  // Redirect if update is successful
  if (data && data.updateStation.success) {
    return <Redirect to='/stations' />
  }

  const onSubmit = (station) => {
    // Ensure document array is list of ids
    if (station.documents && station.documents[0] && station.documents[0].id) {
      station.documents = station.documents.map(({ id }) => id)
    }
    updateStation({ variables: station })
  }

  const copyQrCodeToClipboard = () => {
    // Create section element for copying
    const section = document.createElement('section')

    // Create title element and append to selection
    const h2 = document.createElement('h2')
    h2.innerText = station.name
    section.appendChild(h2)

    // Create image element and append to selection
    const canvas = document.getElementById('qrcode')
    const img = document.createElement('img')
    img.src = canvas.toDataURL('image/png')
    section.appendChild(img)

    // Append everything to body
    document.body.appendChild(section)

    // Create selection
    const selection = window.getSelection()
    const range = window.document.createRange()
    selection.removeAllRanges()
    range.selectNode(section)
    selection.addRange(range)

    // Copy content to clipboard
    window.document.execCommand('copy')

    // Cleanup
    selection.removeAllRanges()
    window.document.body.removeChild(section)

    // Notify
    createAlert({ variables: { message: 'QR-Code copied!', type: 'INFO' } })
  }

  var port = window.location.port
  port = (port && port !== 80 && port !== 443) ? `:${port}` : ''
  const qrUrl = `${window.location.protocol}//${window.location.hostname}${port}/qr/${station.id}`
  const documentUrl = station.redirect_document ? station.redirect_document.link : null

  return (
    <>
      <StationForm station={station} onSubmit={onSubmit}>
        <Link to='/stations'>
          <Button
            variant='outlined'
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
      <QRCode
        id='qrcode'
        value={qrUrl}
        fgColor={station.color}
      />
      <br />
      <Button
        variant='outlined'
        color='primary'
        className={classes.button}
        onClick={copyQrCodeToClipboard}
      >
          Copy to clipboard
      </Button>
      <Typography className={classes.paragraph} component='p'>
        This station link:<br />
        <a href={qrUrl}>{qrUrl}</a><br />
        Redirects to:<br />
        <a href={documentUrl}>{documentUrl}</a>
      </Typography>
    </>
  )
}

StationUpdate.propTypes = {
  station: PropTypes.object.isRequired
}

export default StationUpdate
