import React from 'react'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_TENANT, GET_TENANTS, CREATE_ALERTCLIENT } from './queries'
import { makeStyles } from '@material-ui/core/styles'
import Prompt from './Prompt'
import { useToggle } from './hooks'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1, 1, 1, 0)
  }
}))

const TenantDelete = ({ tenant }) => {
  const classes = useStyles()

  const [createAlert] = useMutation(CREATE_ALERTCLIENT)
  const [deleteTenant, { data }] = useMutation(DELETE_TENANT, {
    refetchQueries: [{
      query: GET_TENANTS
    }],
    onCompleted: () => createAlert({ variables: { message: 'Tenant deleted!', type: 'SUCCESS' } })
  })

  const [active, toggle] = useToggle(false)

  if (data && data.deleteTenant.success) {
    return <Redirect to='/tenants' />
  }

  return (
    <>
      <Button
        variant='outlined'
        color='secondary'
        type='submit'
        className={classes.button}
        onClick={toggle}
      >
        Delete
      </Button>
      <Prompt
        title='Delete Tenant'
        content={`Do you really want to delete the tenant: ${tenant.name} ?`}
        open={active}
        onSubmit={event => deleteTenant({ variables: tenant })}
        onClose={toggle}
      />
    </>
  )
}

TenantDelete.propTypes = {
  tenant: PropTypes.object.isRequired
}

export default TenantDelete
