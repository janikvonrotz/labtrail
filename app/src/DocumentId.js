import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Loading from './Loading'
import Error from './Error'
import DocumentUpdate from './DocumentUpdate'
import { useQuery } from '@apollo/react-hooks'
import { GET_DOCUMENT } from './queries'
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

const DocumentId = ({ match: { params: { id } } }) => {
  const classes = useStyles()

  // Get document by id
  const { loading, error, data } = useQuery(GET_DOCUMENT, { variables: { id: id } })

  if (loading) return <Paper className={classes.paper}><Loading /></Paper>
  if (error) return <Paper className={classes.paper}><Error message={error.message} /></Paper>

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant='h3' component='h1'>
        Document: {data.document.title}
      </Typography>
      <DocumentUpdate document={data.document} />
    </Paper>
  )
}

DocumentId.propTypes = {
  match: PropTypes.object.isRequired
}

export default DocumentId
