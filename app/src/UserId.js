import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Loading from './Loading'
import Error from './Error'
import UserUpdate from './UserUpdate'
import { useQuery } from '@apollo/react-hooks'
import { GET_USER } from './queries'
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

const UserId = ({ match: { params: { id } } }) => {
  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_USER, { variables: { id: id } })

  if (loading) return <Paper className={classes.paper}><Loading /></Paper>
  if (error) return <Paper className={classes.paper}><Error message={error.message} /></Paper>

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant='h3' component='h1'>
        User: {data.user.email}
      </Typography>
      <UserUpdate user={data.user} />
    </Paper>
  )
}

UserId.propTypes = {
  match: PropTypes.object.isRequired
}

export default UserId
