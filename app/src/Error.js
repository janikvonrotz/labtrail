import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

const Error = ({ message }) => (
  <>
    <Typography variant='body1'>
      Error :(
    </Typography>
    <Typography variant='body1'>
      {message}
    </Typography>
  </>
)

Error.propTypes = {
  message: PropTypes.string.isRequired
}

export default Error
