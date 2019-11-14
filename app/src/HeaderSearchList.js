import React from 'react'
import { SEARCH } from './queries'
import { useQuery } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import Link from 'react-router-dom/Link'
import { groupBy } from './helpers'

const useStyles = makeStyles(theme => ({
  root: {
    top: theme.spacing(9),
    width: 300,
    position: 'absolute',
    right: 0,
    zIndex: 1
  },
  paper: {
    padding: theme.spacing(2, 2),
    position: 'absolute'
  },
  list: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    padding: theme.spacing(1, 1)
  },
  link: {
    textDecoration: 'none'
  }
}))

const HeaderSearchList = ({ query }) => {
  const classes = useStyles()

  const { data } = useQuery(SEARCH, { variables: { query: query } })

  console.log(data)

  // By default do not show any results
  var result = null

  // If query is present and result set is empty show empty results
  if (query && data && data.search && data.search.length === 0) {
    result = (
      <>
        <Typography className={classes.title} variant='h5' component='h3'>
          No Results
        </Typography>
        <Divider />
        <List className={classes.list}>
          <ListItem button>
            <ListItemText
              primary='Empty'
              secondary='No resuls for your search query.'
            />
          </ListItem>
        </List>
      </>
    )
  }

  if (query && data && data.search && data.search.length !== 0) {
    // group search results
    console.log(data)

    data.search = groupBy('__typename')(data.search)
    const items = []
    for (const key in data.search) {
      items.push(
        <>
          <Typography className={classes.title} variant='h5' component='h3'>
            {key}
          </Typography>
          <Divider />
          <List className={classes.list}>
            {data.search[key].map(item => (
              <Link key={item.id} to={`${key.toLowerCase()}/${item.id}`} className={classes.link}>
                <ListItem button>
                  <ListItemText
                    primary={item.title || item.name}
                    secondary='Test with search results.'
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </>
      )
    }
    result = items
  }

  if (result) {
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          {result}
        </Paper>
      </div>
    )
  } else {
    return null
  }
}

HeaderSearchList.propTypes = {
  user: PropTypes.string
}

export default HeaderSearchList
