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

  console.log(data, query)

  var result = (
    <>
      <Typography className={classes.title} variant='h5' component='h3'>
        Type
      </Typography>
      <Divider />
      <List className={classes.list}>
        <Link to='/' className={classes.link}>
          <ListItem button>
            <ListItemText
              primary='Numera'
              secondary='Test with search results.'
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary='Numera Info'
              secondary='Test with search results.'
            />
          </ListItem>
        </Link>
      </List>
    </>
  )
  if (data && query) {
    result = (
      <>
        {data.search.map(result => (
          <>
            <Typography className={classes.title} variant='h5' component='h3'>
              {result.__typename}
            </Typography>
            <Divider />
            <List className={classes.list}>
              <Link to='/' className={classes.link}>
                <ListItem button>
                  <ListItemText
                    primary='Numera'
                    secondary='Test with search results.'
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    primary='Numera Info'
                    secondary='Test with search results.'
                  />
                </ListItem>
              </Link>
            </List>
          </>
        ))}
      </>
    )
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {result}
      </Paper>
    </div>
  )
}

HeaderSearchList.propTypes = {
  user: PropTypes.string
}

export default HeaderSearchList
