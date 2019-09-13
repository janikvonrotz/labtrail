import React from 'react'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import StationList from './StationList'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(2, 0)
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
  button: {
    margin: theme.spacing(1)
  }
}))

const Stations = () => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant='h3' component='h1'>
        Stations
      </Typography>
      <Link to='/station'>
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
        >
          Add
        </Button>
      </Link>
      <StationList />
    </Paper>
  )
}

export default Stations
