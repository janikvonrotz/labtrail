import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    title: {
        margin: theme.spacing(2, 0)
    },
    paper: {
      padding: theme.spacing(3, 2),
    },
}))

const Profile = () => {
    const classes = useStyles()

    return (
        <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h3" component="h1">
            Home
            </Typography>
            <Typography component="p">
            Paper can be used to build surface or other elements for your application.
            </Typography>
        </Paper>
    )
}

export default Profile