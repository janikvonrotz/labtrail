import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import { useForm } from './hooks'

const CategoryForm = ({ children, category, onSubmit }) => {

  const { values, handleChange, handleSubmit } = useForm(onSubmit, category)

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        variant='standard'
        margin='normal'
        required
        fullWidth
        id='name'
        name='name'
        label='Name'
        type='text'
        value={values.name}
        onChange={handleChange}
        autoFocus
      />
      {children}
    </form>
  )
}

CategoryForm.propTypes = {
  category: PropTypes.object,
  children: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default CategoryForm
