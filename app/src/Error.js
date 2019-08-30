import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(3, 2),
    },
}))

const Error = ({ message }) => {
    const classes = useStyles()

    return (
        <Paper className={classes.paper}>
            <Typography variant="body1">
                Error :(
        </Typography>
            <Typography variant="body1">
                {message}
            </Typography>
        </Paper>
    )
}

Error.propTypes = {
    message: PropTypes.string.isRequired,
}

export default Error
