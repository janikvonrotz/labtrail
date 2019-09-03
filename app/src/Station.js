import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Loading from './Loading'
import Error from './Error'
import StationSaveButton from './StationSaveButton'
import { useQuery } from '@apollo/react-hooks'
import { GET_STATION } from './queries'

const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(2, 0)
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
  button: {
    margin: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1, 0)
  }
}))

const Station = ({ match: { params: { id } } }) => {
  const classes = useStyles()

  // Get station by id
  const { loading, error, data } = useQuery(GET_STATION, { variables: { id: id } })

  if (loading) return <Paper className={classes.paper}><Loading /></Paper>
  if (error) return <Paper className={classes.paper}><Error message={error.message} /></Paper>

  // Contains updated values of station
  var station = { id: data.station.id }

  // Handle method for form fields
  const handleChange = name => event => {
    station[name] = event.target.value
  }

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant='h3' component='h1'>
        Station: {data.station.name}
      </Typography>
      <TextField
        variant='standard'
        margin='normal'
        required
        fullWidth
        id='name'
        name='name'
        label='Name'
        type='text'
        defaultValue={data.station.name}
        onChange={handleChange('name')}
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
        defaultValue={data.station.location}
        onChange={handleChange('location')}
      />
      <FormControl fullWidth className={classes.formControl}>
        <InputLabel htmlFor='color'>Color</InputLabel>
        <Select
          inputProps={{
            name: 'Color',
            id: 'color'
          }}
          value={data.station.color}
          onChange={handleChange('color')}
        >
          <MenuItem value='RED'>RED</MenuItem>
          <MenuItem value='GREEN'>GREEN</MenuItem>
          <MenuItem value='BLUE'>BLUE</MenuItem>
        </Select>
      </FormControl>
      <Link to='/stations'>
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
        >
          Cancel
        </Button>
      </Link>
      <StationSaveButton station={station} />
    </Paper>
  )
}

Station.propTypes = {
  match: PropTypes.object.isRequired
}

export default Station
