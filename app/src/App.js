import React from 'react'
import Button from '@material-ui/core/Button'
import Apollo from './components/Apollo'
import Theme from './components/Theme'
import FlexboxGrid from './components/FlexboxGrid'

function App() {
  return (
    <Apollo>
        <Theme>
            <FlexboxGrid>
                <Button variant="contained" color="primary">
                Hello World
                </Button>
            </FlexboxGrid>
        </Theme>
    </Apollo>
  )
}

export default App
