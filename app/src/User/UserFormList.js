import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 300
  }
}))

const UserFormList = ({ users }) => {
  const classes = useStyles()

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>email</TableCell>
          <TableCell align='right'>firstname</TableCell>
          <TableCell align='right'>lastname</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users && users.map(user => (
          <TableRow key={user.id}>
            <TableCell component='th' scope='row'>
              <Link to={`/user/${user.id}`}>{user.email}</Link>
            </TableCell>
            <TableCell align='right'>{user.firstname}</TableCell>
            <TableCell align='right'>{user.lastname}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

UserFormList.propTypes = {
  users: PropTypes.array
}

export default UserFormList
