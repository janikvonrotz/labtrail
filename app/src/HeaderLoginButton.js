import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { GET_CURRENT_USER } from './queries'
import { useQuery } from '@apollo/react-hooks'

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none'
  }
}))

const HeaderLoginButton = () => {
  const classes = useStyles()

  const { client, data } = useQuery(GET_CURRENT_USER)

  // Reset Apollo and local store on logout
  const logout = () => {
    window.localStorage.clear()
    client.resetStore()
  }

  if (data && data.currentUser) {
    return (
      <Button onClick={logout} color='inherit'>Logout</Button>
    )
  }
  return (
    <Link to='/login' className={classes.link}>
      <Button color='inherit'>Login</Button>
    </Link>
  )
}

export default HeaderLoginButton
