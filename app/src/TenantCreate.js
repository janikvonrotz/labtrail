import React from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TenantForm from './TenantForm'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_TENANT, GET_TENANTS, CREATE_ALERTCLIENT } from './queries'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}))

const TenantCreate = () => {
  const classes = useStyles()

  // Set default values
  const tenant = { name: '' }

  const [createAlert] = useMutation(CREATE_ALERTCLIENT)
  const [createTenant, { data }] = useMutation(CREATE_TENANT, {
    refetchQueries: [{
      query: GET_TENANTS
    }],
    onCompleted: () => createAlert({ variables: { message: 'Tenant created!', type: 'SUCCESS' } })
  })

  // Redirect if update is successful
  if (data && data.createTenant.id) {
    return <Redirect to='/tenants' />
  }

  return (
    <TenantForm tenant={tenant} onSubmit={(tenant) => (createTenant({ variables: tenant }))}>
      <Link to='/tenants'>
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
        >
          Cancel
        </Button>
      </Link>
      <Button
        variant='contained'
        color='primary'
        type='submit'
        className={classes.button}
      >
        Add
      </Button>
    </TenantForm>
  )
}

TenantCreate.propTypes = {
  tenant: PropTypes.object
}

export default TenantCreate
