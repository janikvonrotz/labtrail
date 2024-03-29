import React from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import DocumentForm from './DocumentForm'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_DOCUMENT, GET_DOCUMENTS, CREATE_ALERTCLIENT } from '../queries'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1, 1, 1, 0)
  }
}))

const DocumentCreate = () => {
  const classes = useStyles()

  // Set default values
  const document = { title: '', link: '', description: '', category: null, forward: false }

  const [createAlert] = useMutation(CREATE_ALERTCLIENT)
  const [createDocument, { data }] = useMutation(CREATE_DOCUMENT, {
    refetchQueries: [{
      query: GET_DOCUMENTS
    }],
    onCompleted: () => createAlert({ variables: { message: 'Document created!', type: 'SUCCESS' } })
  })

  // Redirect if update is successful
  if (data && data.createDocument.id) {
    return <Redirect to='/documents' />
  }

  return (
    <DocumentForm document={document} onSubmit={(document) => (createDocument({ variables: document }))}>
      <Link to='/documents'>
        <Button
          variant='outlined'
          color='secondary'
          className={classes.button}
        >
          Cancel
        </Button>
      </Link>
      <Button
        variant='contained'
        color='primary'
        type='submit'
        className={classes.button}
      >
        Add
      </Button>
    </DocumentForm>
  )
}

DocumentCreate.propTypes = {
  document: PropTypes.object
}

export default DocumentCreate
