import React from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import UserForm from './UserForm'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_USER, GET_USERS, CREATE_ALERTCLIENT } from './queries'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1, 1, 1, 0)
  }
}))

const UserCreate = () => {
  const classes = useStyles()

  const [createAlert] = useMutation(CREATE_ALERTCLIENT)
  // Set default values
  const user = { firstname: '', lastname: '', email: '', password: '', role: 'USER' }

  const [createUser, { data }] = useMutation(CREATE_USER, {
    refetchQueries: [{
      query: GET_USERS
    }],
    onCompleted: () => createAlert({ variables: { message: 'User created!', type: 'SUCCESS' } })
  })

  // Redirect if update is successful
  if (data && data.createUser.id) {
    return <Redirect to='/users' />
  }

  return (
    <UserForm user={user} onSubmit={(user) => createUser({ variables: user })}>
      <Link to='/users'>
        <Button
          variant='outlined'
          color='secondary'
          className={classes.button}
        >
          Cancel
        </Button>
      </Link>
      <Button
        variant='contained'
        color='primary'
        type='submit'
        className={classes.button}
      >
        Add
      </Button>
    </UserForm>
  )
}

UserCreate.propTypes = {
  user: PropTypes.object
}

export default UserCreate
