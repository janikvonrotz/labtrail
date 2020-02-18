import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Error from '../Error'
import Loading from '../Loading'
import { GET_DOCUMENTS } from '../queries'
import { useQuery } from '@apollo/react-hooks'
import { compareValues } from '../helpers'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}))

const DocumentSelectList = ({ selectedDocuments, setSelectedDocuments }) => {
  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_DOCUMENTS)

  if (loading) return <Loading />
  if (error) return <Error message={error.message} />

  const handleToggle = document => () => {
    // Check if document is selected by id property
    const currentIndex = selectedDocuments.findIndex((selectedDocument) => (document.id === selectedDocument.id))
    const newSelectedDocuments = [...selectedDocuments]

    if (currentIndex === -1) {
      newSelectedDocuments.push(document)
    } else {
      newSelectedDocuments.splice(currentIndex, 1)
    }

    setSelectedDocuments(newSelectedDocuments)
  }

  // Sort documents by title
  data.documents.sort(compareValues('title'))

  return (
    <List className={classes.root}>
      {data.documents.map(document => {
        const labelId = `checkbox-list-label-${document.id}`

        return (
          <ListItem key={document.id} dense button onClick={handleToggle(document)}>
            <ListItemIcon>
              <Checkbox
                edge='start'
                checked={selectedDocuments.findIndex((selectedDocument) => (document.id === selectedDocument.id)) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${document.title} (${document.category.name})`} />
          </ListItem>
        )
      })}
    </List>
  )
}

export default DocumentSelectList
