import React from 'react'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CategoryList from './CategoryList'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(2, 0)
  },
  paper: {
    padding: theme.spacing(3, 2),
    overflowX: 'auto'
  },
  button: {
    margin: theme.spacing(1, 1, 1, 0)
  }
}))

const Categories = () => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant='h3' component='h1'>
        Categories
      </Typography>
      <Link to='/category'>
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
        >
          Add
        </Button>
      </Link>
      <CategoryList />
    </Paper>
  )
}

export default Categories
