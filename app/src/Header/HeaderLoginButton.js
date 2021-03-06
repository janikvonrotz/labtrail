import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { useApolloClient } from '@apollo/react-hooks'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  Link: {
    textDecoration: 'none'
  },
  Button: {
    color: '#fff'
  }
}))

const HeaderLoginButton = ({ user }) => {
  const classes = useStyles()

  // Get Apollo client for store manipulation
  const client = useApolloClient()

  // Reset Apollo and local store on logout
  const logout = () => {
    window.localStorage.clear()
    client.resetStore()
  }

  if (user) {
    return (
      <Link to='/login' className={classes.Link}>
        <Button onClick={logout} className={classes.Button}>Logout</Button>
      </Link>
    )
  }
  return (
    <Link to='/login' className={classes.Link}>
      <Button className={classes.Button}>Login</Button>
    </Link>
  )
}

HeaderLoginButton.propTypes = {
  user: PropTypes.object
}

export default HeaderLoginButton
