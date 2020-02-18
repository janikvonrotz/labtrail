import React from 'react'
import Home from './Home'
import { Route } from 'react-router-dom'
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

const Routes = () => (
  <>
    <Route exact path='/' component={Home} />
    <Route exact path='/tenants' component={Tenants} />
    <Route exact path='/tenant' component={Tenant} />
    <Route exact path='/tenant/:id' component={TenantId} />
    <Route exact path='/stations' component={Stations} />
    <Route exact path='/user' component={User} />
    <Route exact path='/user/:id' component={UserId} />
    <Route exact path='/users' component={Users} />
    <Route exact path='/station' component={Station} />
    <Route exact path='/station/:id' component={StationId} />
    <Route exact path='/document' component={Document} />
    <Route exact path='/documents' component={Documents} />
    <Route exact path='/document/:id' component={DocumentId} />
    <Route exact path='/category' component={Category} />
    <Route exact path='/category/:id' component={CategoryId} />
    <Route exact path='/categories' component={Categories} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/settings' component={Settings} />
    <Route exact path='/profile' component={Profile} />
    <Route exact path='/help' component={Help} />
  </>
)

export default Routes
