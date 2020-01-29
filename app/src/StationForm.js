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
import DocumentForm from './DocumentForm'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { CREATE_DOCUMENT, GET_DOCUMENTS, CREATE_ALERTCLIENT } from './queries'
import { useMutation } from '@apollo/react-hooks'
import Error from './Error'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1, 0)
  },
  title: {
    margin: theme.spacing(2, 0)
  },
  button: {
    margin: theme.spacing(1, 1, 1, 0)
  }
}))

const StationForm = ({ children, station, onSubmit }) => {
  const classes = useStyles()

  const [values, handleChange, handleSubmit] = useForm(onSubmit, station)
  const [selectedDocuments, setSelectedDocuments] = React.useState(station.documents)
  const [active, toggle] = useToggle(false)

  // Create document hooks
  const [createAlert] = useMutation(CREATE_ALERTCLIENT)
  const [activeDocument, toggleDocument] = useToggle(false)
  const [createDocument, { error }] = useMutation(CREATE_DOCUMENT, {
    refetchQueries: [{
      query: GET_DOCUMENTS
    }],
    onCompleted: (data) => {
      // Show alert
      createAlert({ variables: { message: 'Document created!', type: 'SUCCESS' } })
      // Add document to selected documents
      if (data && data.createDocument) {
        selectedDocuments.push(data.createDocument)
        console.log(selectedDocuments)
        setSelectedDocuments(selectedDocuments)
      }
    }
  })

  // Document template
  const document = { title: '', link: '', description: '', category: null, forward: false }

  // Handler for document selection
  const handleSelectDocuments = () => {
    // Set documents array of station
    const event = { target: { name: 'documents', value: selectedDocuments.map(({ id }) => id) } }
    handleChange(event)
    toggle()
  }

  // Reset document selection
  const resetSelectedDocuments = () => {
    setSelectedDocuments(station.documents)
    toggle()
  }

  if (error) return <Error message={error.message} />

  return (
    <>
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
        <Button
          variant='outlined'
          color='primary'
          className={classes.button}
          onClick={toggleDocument}
        >
          Add
        </Button>
        <DocumentFormList documents={selectedDocuments} />
        {children}
      </form>
      <Dialog
        open={activeDocument}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Add Document</DialogTitle>
        <DialogContent>
          <DocumentForm
            onSubmit={document => {
              createDocument({ variables: document })
              toggleDocument()
            }}
            document={document}
          >
            <Button
              type='submit'
              color='primary'
            >
              Save
            </Button>
            <Button
              onClick={toggleDocument}
              color='secondary'
            >
              Cancel
            </Button>
          </DocumentForm>
        </DialogContent>
      </Dialog>
    </>
  )
}

StationForm.propTypes = {
  station: PropTypes.object,
  children: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default StationForm
