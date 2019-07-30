import React from 'react'
import Apollo from './Apollo'
import FlexboxGrid from './FlexboxGrid'
import Header from './Header'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'

function App() {
	return (
		<Apollo>
			<FlexboxGrid>
				<Router>
					<Header/>
					<Routes/>
				</Router>
			</FlexboxGrid>
		</Apollo>
	)
}

export default App
