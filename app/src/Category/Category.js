import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CategoryCreate from './CategoryCreate'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(2, 0)
  },
  paper: {
    padding: theme.spacing(3, 2),
    overflowX: 'auto'
  }
}))

const Category = () => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant='h3' component='h1'>
        Category: New
      </Typography>
      <CategoryCreate />
    </Paper>
  )
}

export default Category
