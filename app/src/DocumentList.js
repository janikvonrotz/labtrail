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
import TableSortLabel from './TableSortLabel'
import { useSortBy } from './hooks'
import { compareValues } from './helpers'

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 300
  }
}))

const DocumentList = () => {
  const classes = useStyles()

  const [clientSortBy, setClientSortBy] = useSortBy()
  const [sortBy, setSortBy] = useSortBy()
  const { loading, error, data } = useQuery(GET_DOCUMENTS, {
    variables: { sortBy: sortBy }
  })

  if (loading) return <Loading />
  if (error) return <Error message={error.message} />

  // Switch between client and server sort
  if (clientSortBy) {
    data.documents.sort(compareValues(clientSortBy.field, clientSortBy.order))
  }

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel
              active={(sortBy && sortBy.field) === 'title'}
              field='title'
              order={sortBy && sortBy.order}
              onClick={event => setSortBy({ field: 'title', order: 'ASC' })}
            />
          </TableCell>
          <TableCell align='right'>
            <TableSortLabel
              active={(sortBy && sortBy.field) === 'link'}
              field='link'
              order={sortBy && sortBy.order}
              onClick={event => setSortBy({ field: 'link', order: 'ASC' })}
            />
          </TableCell>
          <TableCell align='right'>
            <TableSortLabel
              active={(sortBy && sortBy.field) === 'description'}
              field='description'
              order={sortBy && sortBy.order}
              onClick={event => setSortBy({ field: 'description', order: 'ASC' })}
            />
          </TableCell>
          <TableCell align='right'>
            <TableSortLabel
              active={(clientSortBy && clientSortBy.field) === 'category.name'}
              field='category'
              order={clientSortBy && clientSortBy.order}
              onClick={event => setClientSortBy({ field: 'category.name', order: 'ASC' })}
            />
          </TableCell>
          <TableCell align='right'>
            <TableSortLabel
              active={(sortBy && sortBy.field) === 'forward'}
              field='forward'
              order={sortBy && sortBy.order}
              onClick={event => setSortBy({ field: 'forward', order: 'ASC' })}
            />
          </TableCell>
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
            <TableCell align='right'>{document.category && document.category.name}</TableCell>
            <TableCell align='right'>{document.forward ? 'true' : 'false'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default DocumentList
