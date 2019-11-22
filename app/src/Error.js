import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

const Error = ({ message }) => {
  // Token invalidate error
  if (message.includes('Response not successful: Received status code 400')) {
    message = 'Your authentication token from LabTrail has expired, please login again.'
  }

  return (
    <>
      <Typography variant='body1'>
        Error :(
      </Typography>
      <Typography variant='body1'>
        {message}
      </Typography>
    </>
  )
}

Error.propTypes = {
  message: PropTypes.string.isRequired
}

export default Error
