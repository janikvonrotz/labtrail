import React from 'react'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_USER, GET_USERS } from './queries'
import { makeStyles } from '@material-ui/core/styles'
import Prompt from './Prompt'
import { useToggle } from './hooks'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}))

const UserDelete = ({ user }) => {
  const classes = useStyles()

  const [deleteUser, { data }] = useMutation(DELETE_USER, {
    refetchQueries: [{
      query: GET_USERS
    }]
  })
  // const [createAlert] = useMutation(CREATE_ALERTCLIENT, { variables: { message: 'User deleted!', type: 'SUCCESS' } })

  const { toggle, active } = useToggle(false)

  if (data && data.deleteUser.success) {
    // createAlert()
    return <Redirect to='/users' />
  }

  return (
    <>
      <Button
        variant='contained'
        color='secondary'
        type='submit'
        className={classes.button}
        onClick={toggle}
      >
        Delete
      </Button>
      <Prompt
        title='Delete User'
        content={`Do you really want to delete the user: ${user.email} ?`}
        open={active}
        onSubmit={event => deleteUser({ variables: user })}
        onClose={toggle}
      />
    </>
  )
}

UserDelete.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserDelete
