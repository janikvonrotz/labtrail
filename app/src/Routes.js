import React from 'react'
import Home from './Home'
import { Route } from 'react-router-dom'
import Stations from './Stations'
import Station from './Station'
import StationId from './StationId'
import Documents from './Documents'
import DocumentId from './DocumentId'
import Login from './Login'
import Profile from './Profile'
import Document from './Document'
import Category from './Category'
import Categories from './Categories'
import CategoryId from './CategoryId'
import Tenants from './Tenants'
import Tenant from './Tenant'
import TenantId from './TenantId'
import Settings from './Settings'
import Users from './Users'
import User from './User'
import UserId from './UserId'

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
  </>
)

export default Routes
