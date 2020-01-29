import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_CURRENT_USER } from './queries'
import { Redirect } from 'react-router'
import Button from '@material-ui/core/Button'
import { useToggle } from './hooks'
import Prompt from './Prompt'
import Error from './Error'

const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(2, 0)
  }
}))

const ProfileDeleteAccount = () => {
  const classes = useStyles()

  // Password reset form
  const [active, toggle] = useToggle(false)
  const [deleteCurrentUser, { error, data, client }] = useMutation(DELETE_CURRENT_USER)

  // If account has been deleted logout and redirect to entry page
  if (data && data.deleteCurrentUser.success) {
    window.localStorage.clear()
    client.resetStore()
    return <Redirect to='/' />
  }

  if (error) return <Error message={error.message} />

  return (
    <>
      <Typography className={classes.title} variant='h4' component='h2'>
        Account
      </Typography>
      <Button
        variant='contained'
        color='secondary'
        type='submit'
        className={classes.button}
        onClick={toggle}
      >
        Delete Account
      </Button>
      <Prompt
        title='Delete Account'
        content='Do you really want to delete your account?'
        open={active}
        onSubmit={event => deleteCurrentUser()}
        onClose={toggle}
      />
    </>
  )
}

export default ProfileDeleteAccount
