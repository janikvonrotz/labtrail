import ApolloClient from 'apollo-boost'
import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider } from '@apollo/react-hooks'
import typeDefs from './schema'
import resolvers from './resolvers'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'

// This will get rid of: WARNING: heuristic fragment matching going on!
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [] // no types provided
    }
  }
})

// Create and write default cache
const cache = new InMemoryCache({ fragmentMatcher })
const data = {
  data: {
    __typename: 'Alert',
    alert: null
  }
}
cache.writeData({ data })

// Initialize Apollo client
const client = new ApolloClient({
  cache: cache,
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
  },
  typeDefs,
  resolvers
})

// Rewrite default cache on reset
client.onResetStore(() => cache.writeData({ data }))

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
