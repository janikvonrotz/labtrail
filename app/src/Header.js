import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { GET_CURRENT_USER } from './queries'
import { useQuery } from '@apollo/react-hooks'
import HeaderSearch from './HeaderSearch'
import HeaderDrawer from './HeaderDrawer'
import { hasRole } from './helpers'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

// Styles for menu bar and drawer
const useStyles = makeStyles(theme => ({
  buttonMenu: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontFamily: 'HelveticaRoundedBold'
  },
  link: {
    textDecoration: 'none'
  },
  button: {
    color: '#fff'
  }
}))

const Header = () => {
  const classes = useStyles()

  // Hooks
  const [open, setOpen] = React.useState(false)
  const { data: { currentUser } = { currentUser: null } } = useQuery(GET_CURRENT_USER)

  // Function to toggle drawer menu via open state
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <AppBar position='static'>

      <Toolbar>
        <IconButton
          onClick={toggleDrawer}
          edge='start'
          className={classes.buttonMenu}
          color='inherit'
          aria-label='menu'
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h5' className={classes.title}>
          LabTrail
        </Typography>
        {hasRole(currentUser, ['ADMIN', 'MANAGER']) && <HeaderSearch />}
        {!currentUser && (
          <Link to='/login' className={classes.link}>
            <Button className={classes.button}>Login</Button>
          </Link>
        )}
      </Toolbar>

      <HeaderDrawer open={open} toggleDrawer={toggleDrawer} user={currentUser} />

    </AppBar>
  )
}

export default Header
