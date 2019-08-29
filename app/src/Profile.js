import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useQuery } from '@apollo/react-hooks'
import { GET_PROFILE } from './queries'
import Loading from './Loading'
import Error from './Error'

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

    const { loading, error, data } = useQuery(GET_PROFILE)

    if (loading) return <Loading />
    if (error) return <Error message={error.message} />

    return (
        <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h3" component="h1">
            Profil
            </Typography>
            <Typography component="p">
            { `${data.me.firstname} ${data.me.lastname}` }
            </Typography>
        </Paper>
    )
}

export default Profile