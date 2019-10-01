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

const DocumenSortabletList = ({ documents }) => {
  const classes = useStyles()

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>title</TableCell>
          <TableCell align='right'>description</TableCell>
          <TableCell align='right'>category</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {documents ? documents.map(document => (
          <TableRow key={document.id}>
            <TableCell component='th' scope='row'>
              <Link to={`/document/${document.id}`}>{document.title}</Link>
            </TableCell>
            <TableCell align='right'>{document.description}</TableCell>
            <TableCell align='right'>{document.category.name}</TableCell>
          </TableRow>
        )) : ''}
      </TableBody>
    </Table>
  )
}

DocumenSortabletList.propTypes = {
  documents: PropTypes.array
}

export default DocumenSortabletList
