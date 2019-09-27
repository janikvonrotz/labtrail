import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'
import { useForm } from './hooks'
import DocumentTransferList from './DocumentTransfer'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1, 0)
  }
}))

const StationForm = ({ children, station, onSubmit }) => {
  const classes = useStyles()

  const { values, handleChange, handleSubmit } = useForm(onSubmit, station)

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
      <TextField
        variant='standard'
        margin='normal'
        required
        fullWidth
        id='location'
        name='location'
        label='Location'
        type='text'
        value={values.location}
        onChange={handleChange}
      />
      <FormControl fullWidth required className={classes.formControl}>
        <InputLabel htmlFor='color'>Color</InputLabel>
        <Select
          native
          inputProps={{
            name: 'color',
            id: 'color'
          }}
          value={values.color}
          onChange={handleChange}
        >
          <option value='' />
          <option value='RED'>RED</option>
          <option value='GREEN'>GREEN</option>
          <option value='BLUE'>BLUE</option>
        </Select>
      </FormControl>
      <DocumentTransferList />
      {children}
    </form>
  )
}

StationForm.propTypes = {
  station: PropTypes.object,
  children: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default StationForm
