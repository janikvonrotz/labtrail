import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Loading from './Loading'
import Error from './Error'
import { useLazyQuery } from '@apollo/react-hooks'
import { LOGIN_USER } from './queries'
import { Redirect } from 'react-router'

const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(2, 0)
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const Login = () => {
  const classes = useStyles()

  // State to store form values
  const [values, setValues] = React.useState(false)

  // Handle method for form fields
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  // Lazy query for login user method
  const [loginUser, { called, loading, data, error }] = useLazyQuery(
    LOGIN_USER,
    { variables: { email: values.email, password: values.password } }
  )

  // Wait for lazy query
  if (called && loading) return <Loading />

  // Show error message if lazy query fails
  if (error) return <Error message={error.message} />

  // Store token if login is successful
  if (data) {
    window.localStorage.setItem('token', data.loginUser.token)

    // Redirect to home page
    return <Redirect to='/' />
  }

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant='h3' component='h1'>
        Login
      </Typography>
      <form onSubmit={(e) => {
        e.preventDefault()
        loginUser()
      }}
      >
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='email'
          name='email'
          label='Email Address'
          type='email'
          onChange={handleChange('email')}
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
          onChange={handleChange('password')}
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
        >
          Sign in
        </Button>
      </form>
    </Paper>
  )
}

export default Login
