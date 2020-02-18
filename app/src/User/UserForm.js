import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import { useForm } from '../hooks'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import TenantFormSelect from '../Tenant/TenantFormSelect'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1, 0)
  }
}))

const UserForm = ({ children, user, onSubmit }) => {
  const classes = useStyles()

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
        autoFocus
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
        autoFocus
      />
      <TextField
        variant='standard'
        margin='normal'
        required
        fullWidth
        id='email'
        name='email'
        label='Email'
        type='email'
        value={values.email}
        onChange={handleChange}
        autoFocus
      />
      <TextField
        variant='standard'
        margin='normal'
        fullWidth
        id='password'
        name='password'
        label='password'
        type='password'
        value={values.password}
        onChange={handleChange}
        autoFocus
      />
      <FormControl fullWidth required className={classes.formControl}>
        <InputLabel htmlFor='role'>Role</InputLabel>
        <Select
          native
          inputProps={{
            name: 'role',
            id: 'role'
          }}
          value={values.role}
          onChange={handleChange}
        >
          <option value='' />
          <option value='USER'>USER</option>
          <option value='MANAGER'>MANAGER</option>
          <option value='ADMIN'>ADMIN</option>
        </Select>
      </FormControl>
      <TenantFormSelect
        value={values.tenant}
        onChange={handleChange}
        showAll
      />
      {children}
    </form>
  )
}

UserForm.propTypes = {
  user: PropTypes.object,
  children: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default UserForm
