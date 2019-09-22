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

const Routes = () => (
  <>
    <Route exact path='/' component={Home} />
    <Route exact path='/stations' component={Stations} />
    <Route exact path='/station' component={Station} />
    <Route exact path='/station/:id' component={StationId} />
    <Route exact path='/document' component={Document} />
    <Route exact path='/documents' component={Documents} />
    <Route exact path='/document/:id' component={DocumentId} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/profile' component={Profile} />
  </>
)

export default Routes
