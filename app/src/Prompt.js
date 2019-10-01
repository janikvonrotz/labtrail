import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const Prompt = ({ title, content, open, onSubmit, onClose, children, confirmLabel, cancelLabel }) => {
  return (
    <Dialog
      open={open}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {content}
        </DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='secondary'>
          {cancelLabel || 'Cancel'}
        </Button>
        <Button onClick={onSubmit} color='primary' autoFocus>
          {confirmLabel || 'Ok'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

Prompt.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string
}

export default Prompt
