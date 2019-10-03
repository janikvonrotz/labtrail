import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_CURRENT_USER, UPDATE_USERPROFILE } from './queries'
import Loading from './Loading'
import Error from './Error'
import ProfileForm from './ProfileForm'
import Button from '@material-ui/core/Button'

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

  const { loading: queryLoading, error: queryError, data } = useQuery(GET_CURRENT_USER)

  const [updateUserProfile, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_USERPROFILE, {
    refetchQueries: [{
      query: GET_CURRENT_USER
    }]
  })

  if (queryLoading) return <Paper className={classes.paper}><Loading /></Paper>
  if (queryError) return <Paper className={classes.paper}><Error message={queryError.message} /></Paper>

  if (mutationLoading) return <Paper className={classes.paper}><Loading /></Paper>
  if (mutationError) return <Paper className={classes.paper}><Error message={mutationError.message} /></Paper>

  const onSubmit = (user) => {
    updateUserProfile({ variables: user })
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
    </Paper>
  )
}

export default Profile
