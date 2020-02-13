import React from 'react'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_USER, GET_USERS, CREATE_ALERTCLIENT } from './queries'
import { makeStyles } from '@material-ui/core/styles'
import Prompt from './Prompt'
import { useToggle } from './hooks'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1, 1, 1, 0)
  }
}))

const UserDelete = ({ user }) => {
  const classes = useStyles()

  const [createAlert] = useMutation(CREATE_ALERTCLIENT)
  const [deleteUser, { data }] = useMutation(DELETE_USER, {
    refetchQueries: [{
      query: GET_USERS
    }],
    onCompleted: () => createAlert({ variables: { message: 'User deleted!', type: 'SUCCESS' } })
  })

  const [active, toggle] = useToggle(false)

  if (data && data.deleteUser.success) {
    return <Redirect to='/users' />
  }

  return (
    <>
      <Button
        variant='outlined'
        color='secondary'
        className={classes.button}
        onClick={toggle}
      >
        Delete
      </Button>
      <Prompt
        title='Delete User'
        content={`Do you really want to delete the user: ${user.email} ?`}
        open={active}
        onSubmit={() => deleteUser({ variables: user })}
        onClose={toggle}
      />
    </>
  )
}

UserDelete.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserDelete
