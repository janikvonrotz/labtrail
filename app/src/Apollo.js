import ApolloClient from 'apollo-boost'
import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider } from 'react-apollo'

// initialize Apollo client
const client = new ApolloClient({
	uri: process.env.REACT_APP_APOLLO_URL || "http://localhost:3000/api",
	clientState: {
		resolvers: {},
	}
})

// Define Apollo component
const Apollo = ({children}) => (
	<ApolloProvider client={client}>
		{children}
	</ApolloProvider>
)

Apollo.propTypes = {
    children: PropTypes.object.isRequired,
}

export default Apollo