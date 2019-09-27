import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Error from './Error'
import Loading from './Loading'
import { GET_DOCUMENTS } from './queries'
import { useQuery } from '@apollo/react-hooks'

const useStyles = makeStyles(theme => ({
  grid: {
    margin: 'auto'
  },
  paper: {
    width: 200,
    height: 230,
    overflow: 'auto'
  },
  button: {
    margin: theme.spacing(0.5, 0)
  }
}))

const DocumentTransfer = () => {
  const classes = useStyles()

  // Get all documents
  const { loading, error, data } = useQuery(GET_DOCUMENTS)

  const [checked, setChecked] = React.useState([])
  const [left, setLeft] = React.useState([0, 1, 2, 3])
  const [right, setRight] = React.useState([4, 5, 6, 7])

  if (loading) return <Loading />
  if (error) return <Error message={error.message} />

  function not (a, b) {
    return a.filter(value => b.indexOf(value) === -1)
  }

  function intersection (a, b) {
    return a.filter(value => b.indexOf(value) !== -1)
  }

  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked))
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))
  }

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked))
    setRight(not(right, rightChecked))
    setChecked(not(checked, rightChecked))
  }

  const DocumentList = documents => (
    <Paper className={classes.paper}>
      <List dense component='div' role='list'>
        {documents.map(document => {
          const labelId = `transfer-list-item-${document.id}-label`

          return (
            <ListItem key={document.id} role='listitem' button onClick={handleToggle(document.id)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(document.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${document.title} (${document.category.name})`} />
            </ListItem>
          )
        })}
        <ListItem />
      </List>
    </Paper>
  )

  return (
    <Grid container spacing={2} justify='center' alignItems='center' className={classes.grid}>
      <Grid item>{DocumentList(data.documents)}</Grid>
      <Grid item>
        <Grid container direction='column' alignItems='center'>
          <Button
            variant='outlined'
            size='small'
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label='move selected right'
          >
            {'Add >'}
          </Button>
          <Button
            variant='outlined'
            size='small'
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label='move selected left'
          >
            {'< Remove'}
          </Button>
        </Grid>
      </Grid>
      <Grid item>{DocumentList(data.documents)}</Grid>
    </Grid>
  )
}

export default DocumentTransfer
