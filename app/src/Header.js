import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CloseIcon from '@material-ui/icons/Close'
import HomeIcon from '@material-ui/icons/Home'
import DirectionsIcon from '@material-ui/icons/Directions'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'
import PeopleIcon from '@material-ui/icons/People'
import PermDeviceInformation from '@material-ui/icons/PermDeviceInformation'
import Person from '@material-ui/icons/Person'
import HeaderLoginButton from './HeaderLoginButton'
import { GET_CURRENT_USER } from './queries'
import { useQuery } from '@apollo/react-hooks'
import SettingsIcon from '@material-ui/icons/Settings'

const drawerWidth = 240

// Styles for menu bar and drawer
const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  drawer: {
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth
  },
  link: {
    textDecoration: 'none'
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
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' className={classes.title}>
          LabTrail
        </Typography>
        <HeaderLoginButton user={data ? data.currentUser : null} />
      </Toolbar>
      <Drawer
        open={open}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <MenuItem onClick={toggleDrawer}>
          <ListItemIcon>
            <CloseIcon />
          </ListItemIcon>
          <ListItemText>Close</ListItemText>
        </MenuItem>
        <Link to='/' className={classes.link}>
          <MenuItem onClick={toggleDrawer}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </MenuItem>
        </Link>
        <Link to='/stations' className={classes.link}>
          <MenuItem onClick={toggleDrawer}>
            <ListItemIcon>
              <PermDeviceInformation />
            </ListItemIcon>
            <ListItemText>Stations</ListItemText>
          </MenuItem>
        </Link>
        <Link to='/documents' className={classes.link}>
          <MenuItem onClick={toggleDrawer}>
            <ListItemIcon>
              <DirectionsIcon />
            </ListItemIcon>
            <ListItemText>Documents</ListItemText>
          </MenuItem>
        </Link>
        <Link to='/categories' className={classes.link}>
          <MenuItem onClick={toggleDrawer}>
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText>Categories</ListItemText>
          </MenuItem>
        </Link>
        <Link to='/tenants' className={classes.link}>
          <MenuItem onClick={toggleDrawer}>
            <ListItemIcon>
              <SupervisedUserCircleIcon />
            </ListItemIcon>
            <ListItemText>Tenants</ListItemText>
          </MenuItem>
        </Link>
        <Link to='/users' className={classes.link}>
          <MenuItem onClick={toggleDrawer}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText>Users</ListItemText>
          </MenuItem>
        </Link>
        <Link to='/settings' className={classes.link}>
          <MenuItem onClick={toggleDrawer}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
        </Link>
        <Link to='/profile' className={classes.link}>
          <MenuItem onClick={toggleDrawer}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
        </Link>
      </Drawer>
    </AppBar>
  )
}

export default Header
