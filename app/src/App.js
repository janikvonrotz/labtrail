import React from 'react'
import Apollo from './Apollo'
import FlexboxGrid from './FlexboxGrid'
import Header from './Header'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'
import AlertClient from './AlertClient'
import theme from './theme'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

function App () {
  return (
    <Apollo>
      <FlexboxGrid>
        <CssBaseline>
          <ThemeProvider theme={theme}>
            <Router>
              <AlertClient />
              <Header />
              <Routes />
            </Router>
          </ThemeProvider>
        </CssBaseline>
      </FlexboxGrid>
    </Apollo>
  )
}

export default App
