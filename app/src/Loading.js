import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2)
  }
}))

const Loading = () => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Typography variant='body1'>
                Loading...
      </Typography>
    </Paper>
  )
}

export default Loading
