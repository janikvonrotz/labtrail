import React from 'react'
import Home from './Home'
import { Route, Switch } from 'react-router-dom'
import Stations from './Station/Stations'
import Station from './Station/Station'
import StationId from './Station/StationId'
import Documents from './Document/Documents'
import DocumentId from './Document/DocumentId'
import Document from './Document/Document'
import Login from './Login'
import Profile from './Profile/Profile'
import Category from './Category/Category'
import Categories from './Category/Categories'
import CategoryId from './Category/CategoryId'
import Tenants from './Tenant/Tenants'
import Tenant from './Tenant/Tenant'
import TenantId from './Tenant/TenantId'
import Settings from './Settings/Settings'
import Users from './User/Users'
import User from './User/User'
import UserId from './User/UserId'
import Help from './Help'
import { GET_CURRENT_USER } from './queries'
import { useQuery } from '@apollo/react-hooks'
import ProtectedRoute from './ProtectedRoute'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Loading from './Loading'

const useStyles = makeStyles(theme => ({
  Paper: {
    padding: theme.spacing(3, 2)
  }
}))

const Routes = () => {
  const classes = useStyles()

  // Get current user
  const { data: { currentUser } = { currentUser: null }, loading } = useQuery(GET_CURRENT_USER)

  if (loading) return <Paper className={classes.Paper}><Loading /></Paper>

  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <ProtectedRoute user={currentUser} exact path='/tenants' component={Tenants} />
      <ProtectedRoute user={currentUser} exact path='/tenant' component={Tenant} />
      <ProtectedRoute user={currentUser} exact path='/tenant/:id' component={TenantId} />
      <ProtectedRoute user={currentUser} exact path='/stations' component={Stations} />
      <ProtectedRoute user={currentUser} exact path='/user' component={User} />
      <ProtectedRoute user={currentUser} exact path='/user/:id' component={UserId} />
      <ProtectedRoute user={currentUser} exact path='/users' component={Users} />
      <ProtectedRoute user={currentUser} exact path='/station' component={Station} />
      <ProtectedRoute user={currentUser} exact path='/station/:id' component={StationId} />
      <ProtectedRoute user={currentUser} exact path='/document' component={Document} />
      <ProtectedRoute user={currentUser} exact path='/documents' component={Documents} />
      <ProtectedRoute user={currentUser} exact path='/document/:id' component={DocumentId} />
      <ProtectedRoute user={currentUser} exact path='/category' component={Category} />
      <ProtectedRoute user={currentUser} exact path='/category/:id' component={CategoryId} />
      <ProtectedRoute user={currentUser} exact path='/categories' component={Categories} />
      <Route path='/login' component={Login} />
      <ProtectedRoute user={currentUser} exact path='/settings' component={Settings} />
      <ProtectedRoute user={currentUser} exact path='/profile' component={Profile} />
      <Route exact path='/help' component={Help} />
    </Switch>
  )
}

export default Routes
