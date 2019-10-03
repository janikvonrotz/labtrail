import React from 'react'
import Apollo from './Apollo'
import FlexboxGrid from './FlexboxGrid'
import Header from './Header'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'
import AlertClient from './AlertClient'
import theme from './theme'
import { ThemeProvider } from '@material-ui/styles'

function App () {
  return (
    <Apollo>
      <FlexboxGrid>
        <ThemeProvider theme={theme}>
          <Router>
            <AlertClient />
            <Header />
            <Routes />
          </Router>
        </ThemeProvider>
      </FlexboxGrid>
    </Apollo>
  )
}

export default App
