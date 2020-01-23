import React from 'react'
import Link from 'react-router-dom/Link'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Drawer from '@material-ui/core/Drawer'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import DirectionsIcon from '@material-ui/icons/Directions'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'
import PeopleIcon from '@material-ui/icons/People'
import PermDeviceInformation from '@material-ui/icons/PermDeviceInformation'
import Person from '@material-ui/icons/Person'
import SettingsIcon from '@material-ui/icons/Settings'
import { hasRole } from './helpers'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Divider from '@material-ui/core/Divider'
import PropTypes from 'prop-types'
import { useApolloClient } from '@apollo/react-hooks'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HelpIcon from '@material-ui/icons/Help'

const drawerWidth = 240

// Styles for menu bar and drawer
const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  link: {
    textDecoration: 'none'
  }
}))

const HeaderDrawer = ({ open, toggleDrawer, user }) => {
  const classes = useStyles()

  // Get Apollo client for store manipulation
  const client = useApolloClient()

  // Reset Apollo and local store on logout
  const logout = () => {
    window.localStorage.clear()
    client.resetStore()
  }

  return (
    <Drawer
      open={open}
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
      onClick={toggleDrawer}
    >
      <MenuItem className={classes.drawerHeader} onClick={toggleDrawer}>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
      </MenuItem>
      <Divider />
      <Link to='/' className={classes.link}>
        <MenuItem>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </MenuItem>
      </Link>
      {hasRole(user, ['ADMIN', 'MANAGER']) && (
        <Link to='/stations' className={classes.link}>
          <MenuItem>
            <ListItemIcon>
              <PermDeviceInformation />
            </ListItemIcon>
            <ListItemText>Stations</ListItemText>
          </MenuItem>
        </Link>
      )}
      {hasRole(user, ['ADMIN', 'MANAGER']) && (
        <Link to='/documents' className={classes.link}>
          <MenuItem>
            <ListItemIcon>
              <DirectionsIcon />
            </ListItemIcon>
            <ListItemText>Documents</ListItemText>
          </MenuItem>
        </Link>
      )}
      {hasRole(user, ['ADMIN', 'MANAGER']) && (
        <Link to='/categories' className={classes.link}>
          <MenuItem>
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText>Categories</ListItemText>
          </MenuItem>
        </Link>
      )}
      {hasRole(user, ['ADMIN']) && (
        <Link to='/tenants' className={classes.link}>
          <MenuItem>
            <ListItemIcon>
              <SupervisedUserCircleIcon />
            </ListItemIcon>
            <ListItemText>Tenants</ListItemText>
          </MenuItem>
        </Link>
      )}
      {hasRole(user, ['ADMIN']) && (
        <Link to='/users' className={classes.link}>
          <MenuItem>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText>Users</ListItemText>
          </MenuItem>
        </Link>)}
      {hasRole(user, ['ADMIN', 'MANAGER']) && (
        <Link to='/settings' className={classes.link}>
          <MenuItem>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
        </Link>
      )}
      {user && (
        <Link to='/profile' className={classes.link}>
          <MenuItem>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
        </Link>
      )}
      <Link to='/help' className={classes.link}>
        <MenuItem>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText>Help</ListItemText>
        </MenuItem>
      </Link>
      {user && (
        <Link to='/login' className={classes.Link}>
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Link>
      )}
    </Drawer>
  )
}

HeaderDrawer.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func,
  user: PropTypes.object
}

export default HeaderDrawer
