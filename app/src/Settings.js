import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Loading from './Loading'
import Error from './Error'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_CURRENT_USER, ASSIGN_CATEGORY, CREATE_ALERTCLIENT } from './queries'
import SettingsForm from './SettingsForm'

const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(2, 0)
  },
  paper: {
    padding: theme.spacing(3, 2)
  }
}))

const Settings = () => {
  const classes = useStyles()

  const [createAlert] = useMutation(CREATE_ALERTCLIENT)
  const { loading: queryLoading, error: queryError, data, client } = useQuery(GET_CURRENT_USER)
  const [assignCategory, { loading: mutationLoading, error: mutationError }] = useMutation(ASSIGN_CATEGORY, {
    refetchQueries: [{
      query: GET_CURRENT_USER
    }],
    onCompleted: () => {
      client.resetStore()
      createAlert({ variables: { message: 'Settings saved! Cache reseted.', type: 'SUCCESS' } })
    }
  })

  const handleSubmit = (category) => {
    assignCategory({ variables: category })
  }

  if (queryLoading || mutationLoading) return <Paper className={classes.paper}><Loading /></Paper>
  if (queryError) return <Paper className={classes.paper}><Error message={queryError.message} /></Paper>
  if (mutationError) return <Paper className={classes.paper}><Error message={mutationError.message} /></Paper>

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant='h3' component='h1'>
        Settings
      </Typography>
      <SettingsForm
        onSubmit={handleSubmit}
        user={data.currentUser}
      >
        <Button
          variant='contained'
          color='primary'
          type='submit'
          className={classes.button}
        >
          Save
        </Button>
      </SettingsForm>
    </Paper>
  )
}

Settings.propTypes = {
  match: PropTypes.object.isRequired
}

export default Settings
