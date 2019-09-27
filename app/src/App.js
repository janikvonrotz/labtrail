import React from 'react'
import Apollo from './Apollo'
import FlexboxGrid from './FlexboxGrid'
import Header from './Header'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'
// import AlertClient from './AlertClient'

function App () {
  return (
    <Apollo>
      <FlexboxGrid>
        <Router>
          {/* <AlertClient /> */}
          <Header />
          <Routes />
        </Router>
      </FlexboxGrid>
    </Apollo>
  )
}

export default App
