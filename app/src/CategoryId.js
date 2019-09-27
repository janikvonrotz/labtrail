import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Loading from './Loading'
import Error from './Error'
import CategoryUpdate from './CategoryUpdate'
import { useQuery } from '@apollo/react-hooks'
import { GET_CATEGORY } from './queries'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(2, 0)
  },
  paper: {
    padding: theme.spacing(3, 2)
  }
}))

const CategoryId = ({ match: { params: { id } } }) => {
  const classes = useStyles()

  // Get category by id
  const { loading, error, data } = useQuery(GET_CATEGORY, { variables: { id: id } })

  if (loading) return <Paper className={classes.paper}><Loading /></Paper>
  if (error) return <Paper className={classes.paper}><Error message={error.message} /></Paper>

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant='h3' component='h1'>
        Category: {data.category.name}
      </Typography>
      <CategoryUpdate category={data.category} />
    </Paper>
  )
}

CategoryId.propTypes = {
  match: PropTypes.object.isRequired
}

export default CategoryId
