import React from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import Error from './Error'
import Loading from './Loading'
import { makeStyles } from '@material-ui/core/styles'
import { GET_TENANTS } from './queries'
import { useQuery } from '@apollo/react-hooks'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1, 0)
  }
}))

const TenantFormSelect = ({ value, onChange }) => {
  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_TENANTS)

  if (loading) return <Loading />
  if (error) return <Error message={error.message} />

  return (

    <FormControl fullWidth required className={classes.formControl}>
      <InputLabel htmlFor='tenant'>Tenant</InputLabel>
      <Select
        native
        inputProps={{
          name: 'tenant',
          id: 'tenant'
        }}
        value={value || ''}
        onChange={onChange}
      >
        {!value ? <option value='' /> : null}
        {data.tenants.map(tenant => (
          <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
        ))}
      </Select>
    </FormControl>
  )
}

TenantFormSelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default TenantFormSelect
