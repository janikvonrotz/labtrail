import React from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TenantForm from './TenantForm'
import TenantDelete from './TenantDelete'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_TENANT, GET_TENANTS } from './queries'
import { makeStyles } from '@material-ui/core/styles'
import Error from './Error'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}))

const TenantUpdate = ({ tenant }) => {
  const classes = useStyles()

  // Get hook for Tenant update
  const [updateTenant, { data, error }] = useMutation(UPDATE_TENANT, {
    refetchQueries: [{
      query: GET_TENANTS
    }]
  })
  // const [createAlert] = useMutation(CREATE_ALERTCLIENT, { variables: { message: 'Tenant saved!', type: 'SUCCESS' } })

  if (error) return <Error message={error.message} />

  // Redirect if update is successful
  if (data && data.updateTenant.success) {
    // createAlert()
    return <Redirect to='/tenants' />
  }

  // Form on submit method
  const onSubmit = (tenant) => {
    updateTenant({ variables: tenant })
  }

  return (
    <TenantForm tenant={tenant} onSubmit={onSubmit}>
      <Link to='/tenants'>
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
        >
          Cancel
        </Button>
      </Link>
      <TenantDelete tenant={tenant} />
      <Button
        variant='contained'
        color='primary'
        type='submit'
        className={classes.button}
      >
        Save
      </Button>
    </TenantForm>
  )
}

TenantUpdate.propTypes = {
  tenant: PropTypes.object.isRequired
}

export default TenantUpdate
