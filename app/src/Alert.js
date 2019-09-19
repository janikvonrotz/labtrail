import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
}))

const Alert = ({open, content, onClose}) => {

  const classes = useStyles()

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
      message={<span id='message-id'>{content}</span>}
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
