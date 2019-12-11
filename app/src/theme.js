import { createMuiTheme } from '@material-ui/core/styles'
import 'typeface-roboto'
import 'typeface-helveticarounded-bold'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0064a6' // ZHAW primary color Pantone 2945 U
    },
    secondary: {
      main: '#000' // ZHAW secondary color Pantone 7502
    }
  }
})

export default theme
