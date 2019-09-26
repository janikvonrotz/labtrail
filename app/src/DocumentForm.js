import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import { useForm } from './hooks'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import CategoryFormSelect from './CategoryFormSelect'

const DocumentForm = ({ children, document, onSubmit }) => {

  const { values, handleChange, handleSubmit } = useForm(onSubmit, document)

  // Get category id from nested object
  if (values.category && values.category.id) {
    values.category = values.category.id
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        variant='standard'
        margin='normal'
        required
        fullWidth
        id='title'
        name='title'
        label='Title'
        type='text'
        value={values.title}
        onChange={handleChange}
        autoFocus
      />
      <TextField
        variant='standard'
        margin='normal'
        required
        fullWidth
        id='link'
        name='link'
        label='Link'
        type='url'
        value={values.link}
        onChange={handleChange}
      />
      <TextField
        variant='standard'
        margin='normal'
        fullWidth
        id='description'
        name='description'
        label='Description'
        type='text'
        value={values.description}
        onChange={handleChange}
      />
      <CategoryFormSelect
        value={values.category}
        onChange={handleChange}
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={values.forward}
              value={values.forward}
              onChange={handleChange}
              name='forward'
              color='primary'
              inputProps={{ 'aria-label': 'Forward' }}
            />
          }
          label='Forward'
        />
      </FormGroup>
      {children}
    </form>
  )
}

DocumentForm.propTypes = {
  document: PropTypes.object,
  children: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default DocumentForm
