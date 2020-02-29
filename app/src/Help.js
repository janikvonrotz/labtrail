import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

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

const Help = () => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant='h3' component='h1'>
        Help
      </Typography>
      <Typography component='p'>
        Here you find a description for each LabTrail keyword.
      </Typography>
      <Typography className={classes.title} variant='h4' component='h2'>
        Tenant
      </Typography>
      <Typography component='p'>
        The tenant is the organization your user is assigned to. All data you create and see in LabTrail is tied to your active tenant. A tenant can have multiple users and a user can be assigned to multiple tenants. But only one tenant can be active. Checkout the <Link to='/profile'>Profile</Link> page to see your active tenant.
      </Typography>
      <Typography className={classes.title} variant='h4' component='h2'>
        Profile
      </Typography>
      <Typography component='p'>
       On the profile page you manage your personal data. Here you can update your name, password or change your active tenant.
      </Typography>
      <Typography className={classes.title} variant='h4' component='h2'>
        Stations
      </Typography>
      <Typography component='p'>
       A station is a real object that is connected by a QR-code to a digital ressource. A station has a location and its QR-code has a color. A station has multiple documents. 
      </Typography>
      <Typography className={classes.title} variant='h4' component='h2'>
        Documents
      </Typography>
      <Typography component='p'>
        Documents are urls that point to website or document on the web. Documents have a category and are assigned to stations.
      </Typography>
      <Typography className={classes.title} variant='h4' component='h2'>
        Categories
      </Typography>
      <Typography component='p'>
        Based on the active category of the tenant LabTrail decides which station QR-code links to which document url.
      </Typography>
      <Typography className={classes.title} variant='h4' component='h2'>
        Settings
      </Typography>
      <Typography component='p'>
        In the settings page you can manage the active tenant category. Station QR-codes link documents based on the active category set there.
      </Typography>
    </Paper>
  )
}

export default Help
