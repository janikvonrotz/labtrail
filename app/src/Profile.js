import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_CURRENT_USER, UPDATE_USERPROFILE, UPDATE_USERPASSWORD, CREATE_ALERTCLIENT } from './queries'
import Loading from './Loading'
import Error from './Error'
import ProfileForm from './ProfileForm'
import Button from '@material-ui/core/Button'
import { useToggle, useForm } from './hooks'
import Prompt from './Prompt'
import ProfilePasswordForm from './ProfilePasswordForm'
import { Redirect } from 'react-router'

const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(2, 0)
  },
  paper: {
    padding: theme.spacing(3, 2)
  }
}))

const Profile = () => {
  const classes = useStyles()

  const [createAlert] = useMutation(CREATE_ALERTCLIENT)

  // Password reset form
  const { toggle, active } = useToggle(false)
  const { values, handleChange } = useForm(null, { new_password: '', new_password_repeated: '' })
  const [updateUserPassword, { loading: updateUserPasswordLoading, error: updateUserPasswordError, data: updateUserPasswordData }] = useMutation(UPDATE_USERPASSWORD, {
    onCompleted: () => {
      window.localStorage.clear()
      client.resetStore()
      createAlert({ variables: { message: 'Password saved. Login again!', type: 'SUCCESS' } })
    }
  })

  // User settings
  const { loading: queryLoading, error: queryError, data } = useQuery(GET_CURRENT_USER)
  const [updateUserProfile, { loading: updateUserProfileLoading, error: updateUserProfileError, client }] = useMutation(UPDATE_USERPROFILE, {
    onCompleted: () => {
      client.resetStore()
      createAlert({ variables: { message: 'Profile saved! Reseted cache.', type: 'SUCCESS' } })
    }
  })

  if (queryLoading || updateUserPasswordLoading || updateUserProfileLoading ) return <Paper className={classes.paper}><Loading /></Paper>
  if (queryError) return <Paper className={classes.paper}><Error message={queryError.message} /></Paper>
  if (updateUserPasswordError) return <Paper className={classes.paper}><Error message={updateUserPasswordError.message} /></Paper>
  if (updateUserProfileError) return <Paper className={classes.paper}><Error message={updateUserProfileError.message} /></Paper>
  if (updateUserPasswordData && updateUserPasswordData.updateUserPassword && updateUserPasswordData.updateUserPassword.success) return <Redirect to='/login' />

  // Update user profile data
  const onSubmit = (user) => {
    updateUserProfile({ variables: user })
  }

  // Reset password
  const updatePassword = () => {
    updateUserPassword({ variables: values })
    toggle()
  }

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant='h3' component='h1'>
            Profile
      </Typography>
      <Typography component='p'>
        Name: {`${data.currentUser.firstname} ${data.currentUser.lastname}`}
      </Typography>
      <Typography component='p'>
        Role: {data.currentUser.role}
      </Typography>
      <Typography component='p'>
        Tenant: {data.currentUser.tenant.name}
      </Typography>
      <Typography className={classes.title} variant='h4' component='h2'>
        Settings
      </Typography>
      <ProfileForm user={data.currentUser} onSubmit={onSubmit}>
        <Button
          variant='contained'
          color='primary'
          type='submit'
          className={classes.button}
        >
          Save
        </Button>
      </ProfileForm>
      <Typography className={classes.title} variant='h4' component='h2'>
        Password
      </Typography>
      <Button
        variant='contained'
        color='secondary'
        type='submit'
        className={classes.button}
        onClick={toggle}
      >
        Set Password
      </Button>
      <Prompt
        title='Set Password'
        content='Please enter the new passwords:'
        open={active}
        onSubmit={event => updatePassword()}
        onClose={toggle}
      >
        <ProfilePasswordForm values={values} handleChange={handleChange} />
      </Prompt>
    </Paper>
  )
}

export default Profile
