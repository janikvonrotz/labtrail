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
import { GET_STATIONS } from './queries'
import { useQuery } from '@apollo/react-hooks'

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 300
  }
}))

const StationList = () => {
  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_STATIONS)

  if (loading) return <Loading />
  if (error) return <Error message={error.message} />

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align='right'>Location</TableCell>
          <TableCell align='right'>Color</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.stations.map(station => (
          <TableRow key={station.id}>
            <TableCell component='th' scope='row'>
              <Link to={`/station/${station.id}`}>{station.name}</Link>
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
