import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Loading from './Loading'
import Error from './Error'
import { useLazyQuery } from '@apollo/react-hooks'
import { LOGIN_USER, GET_CURRENT_USER } from './queries'
import { Redirect } from 'react-router'
import { useForm } from './hooks'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  GridContainer: {
    justifyContent: 'center'
  },
  Titel: {
    margin: theme.spacing(2, 0)
  },
  Paper: {
    padding: theme.spacing(3, 2)
  },
  ButtonSubmit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const Login = ({ match }) => {
  const classes = useStyles()

  // Use form state
  const [values, handleChange, handleSubmit] = useForm((credentials) => loginUser(), {
    email: '',
    password: ''
  })

  // Lazy query for login user method
  const [loginUser, { called, loading, data, error, client }] = useLazyQuery(LOGIN_USER, {
    variables: values,
    refetchQueries: [{
      query: GET_CURRENT_USER
    }]
  })

  // Wait for lazy query
  if (called && loading) return <Paper className={classes.Paper}><Loading /></Paper>

  // Show error message if lazy query fails
  if (error) return <Paper className={classes.Paper}><Error message={error.message} /></Paper>

  // Store token if login is successful
  if (data && data.loginUser.token) {
    // Set new token
    window.localStorage.setItem('token', data.loginUser.token)

    // Reset store
    client.resetStore()

    // Redirect to home page
    return <Redirect to='/' />
  }

  return (
    <Paper className={classes.Paper}>
      <Grid container className={classes.GridContainer}>
        <Grid item>
          <Typography className={classes.Title} variant='h3' component='h1'>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              name='email'
              label='Email Address'
              type='email'
              value={values.email}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='password'
              name='password'
              label='Password'
              type='password'
              value={values.password}
              onChange={handleChange}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.ButtonSubmit}
            >
              Sign in
            </Button>
          </form>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Login
