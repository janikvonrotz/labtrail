import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

const ProfilePasswordForm = ({ values, handleChange }) => {
  console.log(values)
  return (
    <>
      <TextField
        variant='standard'
        margin='normal'
        required
        fullWidth
        id='new_password'
        name='new_password'
        label='New Password'
        type='password'
        value={values.new_password}
        onChange={handleChange}
      />
      <TextField
        variant='standard'
        margin='normal'
        required
        fullWidth
        id='new_password_repeated'
        name='new_password_repeated'
        label='New Password Repeated'
        type='password'
        value={values.new_password_repeated}
        onChange={handleChange}
      />
    </>
  )
}

ProfilePasswordForm.propTypes = {
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default ProfilePasswordForm
