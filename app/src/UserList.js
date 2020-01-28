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
import { GET_USERS } from './queries'
import { useQuery } from '@apollo/react-hooks'
import TableSortLabel from './TableSortLabel'
import { useSortBy } from './hooks'

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 300
  }
}))

const UserList = () => {
  const classes = useStyles()

  const [sortBy, setSortBy] = useSortBy()
  const { loading, error, data } = useQuery(GET_USERS, {
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
              active={(sortBy && sortBy.field) === 'email'}
              field='email'
              order={sortBy && sortBy.order}
              onClick={event => setSortBy({ field: 'email', order: 'ASC' })}
            />
          </TableCell>
          <TableCell align='right'>
            <TableSortLabel
              active={(sortBy && sortBy.field) === 'firstname'}
              field='firstname'
              order={sortBy && sortBy.order}
              onClick={event => setSortBy({ field: 'firstname', order: 'ASC' })}
            />
          </TableCell>
          <TableCell align='right'>
            <TableSortLabel
              active={(sortBy && sortBy.field) === 'lastname'}
              field='lastname'
              order={sortBy && sortBy.order}
              onClick={event => setSortBy({ field: 'lastname', order: 'ASC' })}
            />
          </TableCell>
          <TableCell align='right'>
            <TableSortLabel
              active={(sortBy && sortBy.field) === 'role'}
              field='role'
              order={sortBy && sortBy.order}
              onClick={event => setSortBy({ field: 'role', order: 'ASC' })}
            />
          </TableCell>
          <TableCell align='right'>tenant</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.users.map(user => (
          <TableRow key={user.id}>
            <TableCell component='th' scope='row'>
              <Link to={`/user/${user.id}`}>{user.email}</Link>
            </TableCell>
            <TableCell align='right'>{user.firstname}</TableCell>
            <TableCell align='right'>{user.lastname}</TableCell>
            <TableCell align='right'>{user.role}</TableCell>
            <TableCell align='right'>{user.tenant.name}</TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default UserList
