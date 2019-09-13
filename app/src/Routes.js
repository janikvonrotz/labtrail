import React from 'react'
import Home from './Home'
import { Route } from 'react-router-dom'
import Stations from './Stations'
import Station from './Station'
import StationId from './StationId'
import Login from './Login'
import Profile from './Profile'

const Routes = () => (
  <>
    <Route exact path='/' component={Home} />
    <Route exact path='/stations' component={Stations} />
    <Route exact path='/station' component={Station} />
    <Route exact path='/station/:id' component={StationId} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/profile' component={Profile} />
  </>
)

export default Routes
