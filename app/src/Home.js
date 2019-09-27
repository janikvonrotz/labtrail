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
  }
}))

const Home = () => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant='h3' component='h1'>
        Home
      </Typography>
      <Typography component='p'>
        Welcome to Labtrail
      </Typography>
      <Typography component='p'>
        Here you can manage QR-code links. Every station has its own QR-code that links to a document. Documents are assigned to a category. The tenant defines which category is active.
      </Typography>
    </Paper>
  )
}

export default Home
