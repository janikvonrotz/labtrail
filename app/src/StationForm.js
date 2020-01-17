import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, useToggle } from './hooks'
import DocumentFormList from './DocumentFormList'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Prompt from './Prompt'
import DocumentSelectList from './DocumentSelectList'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1, 0)
  },
  title: {
    margin: theme.spacing(2, 0)
  }
}))

const StationForm = ({ children, station, onSubmit }) => {
  const classes = useStyles()

  const { values, handleChange, handleSubmit } = useForm(onSubmit, station)
  const [selectedDocuments, setSelectedDocuments] = React.useState(station.documents)
  const { toggle, active } = useToggle(false)

  const handleSelectDocuments = () => {
    // Set documents array of station
    const event = { target: { name: 'documents', value: selectedDocuments.map(({ id }) => id) } }
    handleChange(event)
    toggle()
  }

  const resetSelectedDocuments = () => {
    setSelectedDocuments(station.documents)
    toggle()
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
          native
          inputProps={{
            name: 'color',
            id: 'color'
          }}
          value={values.color}
          onChange={handleChange}
        >
          <option value='' />
          <option value='BLACK'>Black</option>
          <option value='RED'>Red</option>
          <option value='GREEN'>Green</option>
          <option value='BLUE'>Blue</option>
        </Select>
      </FormControl>
      <Typography className={classes.title} variant='h4' component='h2'>
        Documents
      </Typography>
      <Button
        variant='contained'
        color='primary'
        className={classes.button}
        onClick={toggle}
      >
        Select
      </Button>
      <Prompt
        title='Select Documents'
        content='Please select the documents to add:'
        open={active}
        onSubmit={handleSelectDocuments}
        onClose={resetSelectedDocuments}
        confirmLabel='Ok'
      >
        <DocumentSelectList
          selectedDocuments={selectedDocuments}
          setSelectedDocuments={setSelectedDocuments}
        />
      </Prompt>
      <DocumentFormList documents={selectedDocuments} />
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
