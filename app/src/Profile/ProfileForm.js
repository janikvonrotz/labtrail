import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import { useForm } from '../hooks'
import TenantFormSelect from '../TenantFormSelect'

const ProfileForm = ({ children, user, onSubmit }) => {
  const [values, handleChange, handleSubmit] = useForm(onSubmit, user)

  // Get tenant id from nested object
  if (values.tenant && values.tenant.id) {
    values.tenant = values.tenant.id
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        variant='standard'
        margin='normal'
        required
        fullWidth
        id='firstname'
        name='firstname'
        label='Firstname'
        type='text'
        value={values.firstname}
        onChange={handleChange}
      />
      <TextField
        variant='standard'
        margin='normal'
        required
        fullWidth
        id='lastname'
        name='lastname'
        label='Lastname'
        type='text'
        value={values.lastname}
        onChange={handleChange}
      />
      <TenantFormSelect
        value={values.tenant}
        onChange={handleChange}
      />
      {children}
    </form>
  )
}

ProfileForm.propTypes = {
  user: PropTypes.object,
  children: PropTypes.element.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default ProfileForm
