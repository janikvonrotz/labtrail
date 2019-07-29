import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

// initalize new material-ui theme
const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
})

const Theme = ({children}) => (
    <MuiThemeProvider theme={theme}>
        {children}
    </MuiThemeProvider>
)

Theme.propTypes = {
    children: PropTypes.object.isRequired,
}

export default Theme