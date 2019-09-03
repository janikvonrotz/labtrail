import ApolloClient from 'apollo-boost'
import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider } from '@apollo/react-hooks'

// Initialize Apollo client
const client = new ApolloClient({
  uri: process.env.REACT_APP_APOLLO_URL || 'http://localhost:3000/api',
  request: async operation => {
    // Get JWT token from local storage
    const token = window.localStorage.getItem('token')

    // Pass token to headers
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
})

// Define Apollo component
const Apollo = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
)

Apollo.propTypes = {
  children: PropTypes.object.isRequired
}

export default Apollo
