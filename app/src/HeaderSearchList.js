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

const useStyles = makeStyles(theme => ({
  Root: {
    top: theme.spacing(9),
    width: 300,
    position: 'absolute',
    right: 0,
    zIndex: 1
  },
  Paper: {
    width: 250,
    padding: theme.spacing(2, 2),
    position: 'absolute'
  },
  List: {
    backgroundColor: theme.palette.background.paper
  },
  Title: {
    padding: theme.spacing(1, 1)
  },
  Link: {
    textDecoration: 'none'
  }
}))

const HeaderSearchList = ({ setQuery, query }) => {
  const classes = useStyles()

  const { data } = useQuery(SEARCH, { variables: { query: query } })

  // By default do not show any results
  var result = null

  // If query is present and result set is empty show empty results
  if (query && data && data.search && data.search.length === 0) {
    result = (
      <>
        <Typography className={classes.Title} variant='h5' component='h3'>
          No Results
        </Typography>
        <Divider />
        <List className={classes.List}>
          <ListItem>
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
    let grouped = {}
    if (data.search.length > 1) {
      grouped = data.search.reduce((objectsByKeyValue, obj) => {
        const value = obj.__typename
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
        return objectsByKeyValue
      }, {})
    } else {
      // Create custom result array if there is only one result
      const key = data.search[0].__typename
      grouped[key] = data.search
    }

    // Generate result items for each group
    const items = []
    for (const key in grouped) {
      items.push(
        <React.Fragment key={key}>
          <Typography className={classes.Title} variant='h5' component='h3'>
            {key}
          </Typography>
          <Divider />
          <List className={classes.List}>
            {grouped[key].map(item => {
              let primary = ''
              let secondary = ''
              switch (key) {
                case 'Document':
                  primary = item.title
                  break
                case 'Station':
                  primary = item.name
                  secondary = item.location
                  break
                case 'User':
                  primary = item.firstname + ' ' + item.lastname
                  secondary = item.email
                  break
                default:
                  primary = item.name
              }

              return (
                <Link key={item.id} to={`/${key.toLowerCase()}/${item.id}`} className={classes.Link}>
                  <ListItem onClick={event => setQuery('')} button>
                    <ListItemText
                      primary={primary}
                      secondary={secondary}
                    />
                  </ListItem>
                </Link>
              )
            })}
          </List>
        </React.Fragment>
      )
    }
    result = items
  }

  if (result) {
    return (
      <div className={classes.Root}>
        <Paper className={classes.Paper}>
          {result}
        </Paper>
      </div>
    )
  } else {
    return null
  }
}

HeaderSearchList.propTypes = {
  setQuery: PropTypes.func,
  query: PropTypes.string
}

export default HeaderSearchList
