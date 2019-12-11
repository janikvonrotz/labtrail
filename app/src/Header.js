import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import HeaderLoginButton from './HeaderLoginButton'
import { GET_CURRENT_USER } from './queries'
import { useQuery } from '@apollo/react-hooks'
import HeaderSearch from './HeaderSearch'
import HeaderDrawer from './HeaderDrawer'
import { hasRole } from './helpers'

// Styles for menu bar and drawer
const useStyles = makeStyles(theme => ({
  ButtonMenu: {
    marginRight: theme.spacing(2)
  },
  Title: {
    flexGrow: 1,
    fontFamily: 'HelveticaRoundedBold'
  }
}))

const Header = () => {
  const classes = useStyles()

  // Hooks
  const [open, setOpen] = React.useState(false)
  const { data } = useQuery(GET_CURRENT_USER)

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
          className={classes.ButtonMenu}
          color='inherit'
          aria-label='menu'
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h5' className={classes.Title}>
          LabTrail
        </Typography>
        {hasRole(data && data.currentUser, ['ADMIN', 'MANAGER']) && <HeaderSearch />}
        <HeaderLoginButton user={data && data.currentUser} />
      </Toolbar>

      <HeaderDrawer open={open} toggleDrawer={toggleDrawer} user={data && data.currentUser} />

    </AppBar>
  )
}

export default Header
