import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Error from '../Error'
import Loading from '../Loading'
import { GET_STATIONS } from '../queries'
import { useQuery } from '@apollo/react-hooks'
import TableSortLabel from '../TableSortLabel'
import { useSortBy } from '../hooks'

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 300
  }
}))

const StationList = () => {
  const classes = useStyles()

  const [sortBy, setSortBy] = useSortBy()
  const { loading, error, data } = useQuery(GET_STATIONS, {
    variables: { sortBy: sortBy }
  })

  if (loading) return <Loading />
  if (error) return <Error message={error.message} />

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel
              active={(sortBy && sortBy.field) === 'name'}
              field='name'
              order={sortBy && sortBy.order}
              onClick={event => setSortBy({ field: 'name', order: 'ASC' })}
            />
          </TableCell>
          <TableCell>documents</TableCell>
          <TableCell align='right'>
            <TableSortLabel
              active={(sortBy && sortBy.field) === 'location'}
              field='location'
              order={sortBy && sortBy.order}
              onClick={event => setSortBy({ field: 'location', order: 'ASC' })}
            />
          </TableCell>
          <TableCell align='right'>
            <TableSortLabel
              active={(sortBy && sortBy.field) === 'color'}
              field='color'
              order={sortBy && sortBy.order}
              onClick={event => setSortBy({ field: 'color', order: 'ASC' })}
            />
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.stations.map(station => (
          <TableRow key={station.id}>
            <TableCell component='th' scope='row'>
              <Link to={`/station/${station.id}`}>{station.name}</Link>
            </TableCell>
            <TableCell align='right'>
              {station.documents.length !== 0 && station.documents.map(
                document => (
                  <a
                    key={document.title}
                    href={`/document/${document.id}`}
                  >
                    {document.title}
                  </a>)
              ).reduce((prev, curr) => <>{prev}<br />{curr}</>)}
            </TableCell>
            <TableCell align='right'>{station.location}</TableCell>
            <TableCell align='right'>{station.color}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default StationList
