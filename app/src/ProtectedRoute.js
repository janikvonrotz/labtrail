import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router'

const ProtectedRoute = ({ user, ...props }) => {
  return !user
    ? <Redirect to='/login' />
    : <Route {...props} />
}

ProtectedRoute.propTypes = {
  user: PropTypes.object
}

export default ProtectedRoute
