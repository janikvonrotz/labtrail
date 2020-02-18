import React from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import UserForm from './UserForm'
import UserDelete from './UserDelete'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_USER, GET_USERS, CREATE_ALERTCLIENT } from '../queries'
import { makeStyles } from '@material-ui/core/styles'
import Error from '../Error'

const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(2, 0)
  },
  button: {
    margin: theme.spacing(1, 1, 1, 0)
  }
}))

const UserUpdate = ({ user }) => {
  const classes = useStyles()

  const [createAlert] = useMutation(CREATE_ALERTCLIENT)
  // Get hook for User update
  const [updateUser, { data, error }] = useMutation(UPDATE_USER, {
    refetchQueries: [
      {
        query: GET_USERS
      }
    ],
    onCompleted: () => createAlert({ variables: { message: 'User saved!', type: 'SUCCESS' } })
  })

  if (error) return <Error message={error.message} />

  // Redirect if update is successful
  if (data && data.updateUser.success) {
    return <Redirect to='/users' />
  }

  const onSubmit = (user) => {
    // Ensure tenant is id string
    if (user.tenant && user.tenant.id) {
      user.tenant = user.tenant.id
    }

    // Ensure passwort is not set if empty
    if (user.password === '') {
      delete user.password
    }

    updateUser({ variables: user })
  }

  return (
    <>
      <UserForm user={user} onSubmit={onSubmit}>
        <Button
          variant='contained'
          color='primary'
          type='submit'
          className={classes.button}
        >
          Save
        </Button>
        <Link to='/users'>
          <Button
            variant='outlined'
            color='secondary'
            className={classes.button}
          >
            Cancel
          </Button>
        </Link>
        <UserDelete user={user} />
      </UserForm>
    </>
  )
}

UserUpdate.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserUpdate
