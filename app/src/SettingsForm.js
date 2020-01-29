import React from 'react'
import PropTypes from 'prop-types'
import CategoryFormSelect from './CategoryFormSelect'
import { useForm } from './hooks'
import Typography from '@material-ui/core/Typography'

const SettingsForm = ({ children, user, onSubmit }) => {
  const [values, handleChange, handleSubmit] = useForm(onSubmit, { category: user.tenant.assigned_category })

  if (values.category && values.category.id) {
    values.category = values.category.id
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography component='p'>
        Set the active category for tenant {user.tenant.name}:
      </Typography>
      <CategoryFormSelect
        value={values.category}
        onChange={handleChange}
      />
      {children}
    </form>
  )
}

SettingsForm.propTypes = {
  user: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default SettingsForm
