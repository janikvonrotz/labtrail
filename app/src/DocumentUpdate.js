import React from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import DocumentForm from './DocumentForm'
import DocumentDelete from './DocumentDelete'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_DOCUMENT, GET_DOCUMENTS, CREATE_ALERTCLIENT } from './queries'
import { makeStyles } from '@material-ui/core/styles'
import Error from './Error'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1, 1, 1, 0)
  }
}))

const DocumentUpdate = ({ document }) => {
  const classes = useStyles()

  const [createAlert] = useMutation(CREATE_ALERTCLIENT)
  // Get hook for Document update
  const [updateDocument, { data, error }] = useMutation(UPDATE_DOCUMENT, {
    refetchQueries: [{
      query: GET_DOCUMENTS
    }],
    onCompleted: () => createAlert({ variables: { message: 'Document saved!', type: 'SUCCESS' } })
  })

  if (error) return <Error message={error.message} />

  // Redirect if update is successful
  if (data && data.updateDocument.success) {
    return <Redirect to='/documents' />
  }

  // Form on submit method
  function onSubmit(document) {
    // Set category id
    if (document.category.id) {
      document.category = document.category.id
    }

    updateDocument({ variables: document })
  }

  return (
    <DocumentForm document={document} onSubmit={onSubmit}>
      <Button
        variant='contained'
        color='primary'
        type='submit'
        className={classes.button}
      >
        Save
      </Button>
      <Link to='/documents'>
        <Button
          variant='outlined'
          color='secondary'
          className={classes.button}
        >
          Cancel
        </Button>
      </Link>
      <DocumentDelete document={document} />
    </DocumentForm>
  )
}

DocumentUpdate.propTypes = {
  document: PropTypes.object.isRequired
}

export default DocumentUpdate
