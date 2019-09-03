import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}))

const FlexBoxGrid = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={1} md={2} />
        <Grid item xs={12} sm={10} md={8}>
          {children}
        </Grid>
        <Grid item xs={12} sm={1} md={2} />
      </Grid>
    </div>
  )
}

FlexBoxGrid.propTypes = {
  children: PropTypes.element.isRequired
}

export default FlexBoxGrid
