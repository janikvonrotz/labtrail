import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1, 0)
  }
}))

const StationForm = ({ children, station, onSubmit }) => {
  const classes = useStyles()

  // Station form state
  const [values, setValues] = React.useState(station)

  function handleChange (event) {
    event.persist()
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }))
  }

  function handleSubmit (event) {
    event.preventDefault()
    onSubmit(values)
  }

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
          inputProps={{
            name: 'color',
            id: 'color'
          }}
          value={values.color}
          onChange={handleChange}
        >
          <MenuItem value='RED'>RED</MenuItem>
          <MenuItem value='GREEN'>GREEN</MenuItem>
          <MenuItem value='BLUE'>BLUE</MenuItem>
        </Select>
      </FormControl>
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
