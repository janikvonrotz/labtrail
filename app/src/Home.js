import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(2, 0)
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
  logo: {
    height: '100px',
    width: '100px'
  }
}))

const Home = () => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <img src='/favicon.png' className={classes.logo} alt='Logo' />
      <Typography className={classes.title} variant='h3' component='h1'>
        LabTrail
      </Typography>
      <Typography component='p'>
        Here you can manage QR-code links.
        Login and create documents that link to an url.
        Assign the document to a station.
        Tell which document category must be active for your current tenant.
        Switch tenants easily from your profile.
      </Typography>
    </Paper>
  )
}

export default Home
