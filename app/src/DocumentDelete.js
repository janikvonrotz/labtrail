import React from 'react'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_DOCUMENT, GET_DOCUMENTS, CREATE_ALERTCLIENT } from './queries'
import { makeStyles } from '@material-ui/core/styles'
import Prompt from './Prompt'
import { useToggle } from './hooks'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}))

const DocumentDelete = ({ document }) => {
  const classes = useStyles()

  const [deleteDocument, { data }] = useMutation(DELETE_DOCUMENT, {
    refetchQueries: [{
      query: GET_DOCUMENTS
    }]
  })
  // const [createAlert] = useMutation(CREATE_ALERTCLIENT, { variables: { message: 'Document deleted!', type: 'SUCCESS' } })

  const { toggle, active } = useToggle(false)

  if (data && data.deleteDocument.success) {
    // createAlert()
    return <Redirect to='/documents' />
  }

  return (
    <>
      <Button
        variant='contained'
        color='secondary'
        type='submit'
        className={classes.button}
        onClick={toggle}
      >
        Delete
      </Button>
      <Prompt
        title='Delete Document'
        content={`Do you really want to delete the document: ${document.title} ?`}
        open={active}
        onSubmit={event => deleteDocument({ variables: document })}
        onClose={toggle}
      />
    </>
  )
}

DocumentDelete.propTypes = {
  document: PropTypes.object.isRequired
}

export default DocumentDelete
