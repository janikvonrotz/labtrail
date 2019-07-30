import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
    },
}))

const Stations = () => {
    const classes = useStyles()

    return (
        <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
            Stations
            </Typography>
            <Typography component="p">
            Paper can be used to build surface or other elements for your application.
            </Typography>
        </Paper>
    )
}

export default Stations