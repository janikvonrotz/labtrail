import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Error from './Error'
import Loading from './Loading'
import { GET_DOCUMENTS } from './queries'
import { useQuery } from '@apollo/react-hooks'

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 300
  }
}))

const DocumentList = () => {
  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_DOCUMENTS)

  if (loading) return <Loading />
  if (error) return <Error message={error.message} />

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>title</TableCell>
          <TableCell align='right'>link</TableCell>
          <TableCell align='right'>description</TableCell>
          <TableCell align='right'>category</TableCell>
          <TableCell align='right'>forward</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.documents.map(document => (
          <TableRow key={document.id}>
            <TableCell component='th' scope='row'>
              <Link to={`/document/${document.id}`}>{document.title}</Link>
            </TableCell>
            <TableCell align='right'>{document.link}</TableCell>
            <TableCell align='right'>{document.description}</TableCell>
            <TableCell align='right'>{document.category.name}</TableCell>
            <TableCell align='right'>{document.forward ? 'true' : 'false'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default DocumentList
