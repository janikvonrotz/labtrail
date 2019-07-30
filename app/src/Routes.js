import React from 'react'
import Home from './Home'
import { Route } from 'react-router-dom'
import Stations from './Stations'

const Routes = () => (
    <>
        <Route exact path="/" component={Home} />
        <Route exact path="/stations" component={Stations} />
    </>
)

export default Routes