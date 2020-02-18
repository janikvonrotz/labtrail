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
import { GET_TENANTS } from '../queries'
import { useQuery } from '@apollo/react-hooks'
import TableSortLabel from '../TableSortLabel'
import { useSortBy } from '../hooks'

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 300
  }
}))

const TenantList = () => {
  const classes = useStyles()

  const [sortBy, setSortBy] = useSortBy()
  const { loading, error, data } = useQuery(GET_TENANTS, {
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
          <TableCell align='right'>assigned category</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.tenants.map(tenant => (
          <TableRow key={tenant.id}>
            <TableCell component='th' scope='row'>
              <Link to={`/tenant/${tenant.id}`}>{tenant.name}</Link>
            </TableCell>
            <TableCell align='right'>{tenant.assigned_category ? tenant.assigned_category.name : ''}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TenantList
