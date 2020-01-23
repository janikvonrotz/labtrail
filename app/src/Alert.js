import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  },
  success: {
    '& div': {
      backgroundColor: '#4caf50'
    }
  }
}))

const Alert = ({ open, alert, onClose }) => {
  const classes = useStyles()

  return (
    <Snackbar
      className={alert.type && classes[alert.type.toLowerCase()]}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      open={open}
      autoHideDuration={2500}
      onClose={onClose}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
      message={<span id='message-id'>{alert.message}</span>}
      action={
        <IconButton
          key='close'
          aria-label='close'
          color='inherit'
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      }
    />
  )
}

export default Alert
