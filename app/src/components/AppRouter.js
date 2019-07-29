import React from 'react'
import { Route, Link } from 'react-router-dom'
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
import ToysIcon from '@material-ui/icons/Toys'
import HistoryIcon from '@material-ui/icons/History'
import SettingsIcon from '@material-ui/icons/Settings'
import InfoIcon from '@material-ui/icons/Info'
import PaperSheet from './PaperSheet'
import FlexboxGrid from './FlexboxGrid'
import Index from '../pages/Index'

class AppRouter extends React.Component {

    constructor(props) {
        super(props)
        this.state = {drawerOpen: false}
    }

    toggleDrawer = () => {
        this.setState({drawerOpen: !this.state.drawerOpen})
    }

    render() {

        return (
            <AppRouter>
                <FlexboxGrid>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit">
                                LabTrail
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer open={this.state.drawerOpen}>
                        <MenuItem onClick={this.toggleDrawer}>
                            <ListItemIcon>
                                <CloseIcon />
                            </ListItemIcon>
                            <ListItemText>Close</ListItemText>
                        </MenuItem>
                        <Link to="/saunas">
                            <MenuItem onClick={this.toggleDrawer}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText>Saunas</ListItemText>
                            </MenuItem>
                        </Link>
                        <Link to="/visitors">
                            <MenuItem onClick={this.toggleDrawer}>
                                <ListItemIcon>
                                    <HistoryIcon />
                                </ListItemIcon>
                                <ListItemText>Besucher</ListItemText>
                            </MenuItem>
                        </Link>
                        <Link to="/temperatures">
                            <MenuItem onClick={this.toggleDrawer}>
                                <ListItemIcon>
                                    <ToysIcon />
                                </ListItemIcon>
                                <ListItemText>Temperaturen</ListItemText>
                            </MenuItem>
                        </Link>
                        <Link to="/settings">
                            <MenuItem onClick={this.toggleDrawer}>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText>Einstellungen</ListItemText>
                            </MenuItem>
                            </Link>
                        <Link to="/about">
                            <MenuItem onClick={this.toggleDrawer}>
                                <ListItemIcon>
                                    <InfoIcon />
                                </ListItemIcon>
                                <ListItemText>Über</ListItemText>
                            </MenuItem>
                        </Link>
                    </Drawer>
                    <PaperSheet>
                        <Route exact path="/" component={Index} />
                    </PaperSheet>
                </FlexboxGrid>
            </AppRouter>
        )
    }
}

export default AppRouter