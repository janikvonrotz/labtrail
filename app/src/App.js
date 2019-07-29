import React, { Component } from 'react'
import './App.css'
import AppRouter from './components/AppRouter'
import Apollo from './components/Apollo'
import Theme from './components/Theme'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Apollo>
                    <Theme>
                        <AppRouter />
                    </Theme>
                </Apollo>
            </div>
        )
    }
}

export default App
