import React from 'react'
import MuiTableSortLabel from '@material-ui/core/TableSortLabel'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}))

const TableSortLabel = ({ active, field, order, onClick }) => {
  const classes = useStyles()

  return (
    <MuiTableSortLabel
      active={active}
      direction={order ? order.toLowerCase() : 'asc'}
      onClick={onClick}
    >
      {field}
      {order ? (
        <span className={classes.visuallyHidden}>
          {order === 'ASC' ? 'sorted ascending' : 'sorted descending'}
        </span>
      ) : null}
    </MuiTableSortLabel>
  )
}

TableSortLabel.propTypes = {
  active: PropTypes.bool.isRequired,
  field: PropTypes.string.isRequired,
  order: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

export default TableSortLabel
