import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CloseIcon from '@material-ui/icons/Close'
import HomeIcon from '@material-ui/icons/Home'
import PermDeviceInformation from '@material-ui/icons/PermDeviceInformation'
import Person from '@material-ui/icons/Person'

const drawerWidth = 240

// Styles for menu bar and drawer
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    link: {
        textDecoration: 'none',
    }
}))

const Header = () => {

    const classes = useStyles()

    // Set function states
    const [open, setOpen] = React.useState(false)

    // Function to toggle drawer menu via open state
    const toggleDrawer = () => {
        setOpen(!open)
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton 
                    onClick={toggleDrawer} 
                    edge="start" 
                    className={classes.menuButton} 
                    color="inherit" 
                    aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                LabTrail
                </Typography>
                <Link to="/login" className={classes.link}>
                    <Button color="inherit">Login</Button>
                </Link>
            </Toolbar>
            <Drawer 
                open={open} 
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper,
                }}>
                <MenuItem onClick={toggleDrawer}>
                    <ListItemIcon>
                        <CloseIcon />
                    </ListItemIcon>
                    <ListItemText>Close</ListItemText>
                </MenuItem>
                <Link to="/" className={classes.link}>
                    <MenuItem onClick={toggleDrawer}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </MenuItem>
                </Link>
                <Link to="/stations" className={classes.link}>
                    <MenuItem onClick={toggleDrawer}>
                        <ListItemIcon>
                            <PermDeviceInformation />
                        </ListItemIcon>
                        <ListItemText>Stations</ListItemText>
                    </MenuItem>
                </Link>
                <Link to="/profile" className={classes.link}>
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