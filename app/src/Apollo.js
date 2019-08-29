import ApolloClient from 'apollo-boost'
import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider } from '@apollo/react-hooks'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

const httpLink = createHttpLink({
	uri: process.env.REACT_APP_APOLLO_URL || "http://localhost:3000/api",
});

const authLink = setContext((_, { headers }) => {

	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('token');

	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		}
	}
})

// initialize Apollo client
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	clientState: {
		resolvers: {},
	}
})

// Define Apollo component
const Apollo = ({ children }) => (
	<ApolloProvider client={client}>
		{children}
	</ApolloProvider>
)

Apollo.propTypes = {
	children: PropTypes.object.isRequired,
}

export default Apollo