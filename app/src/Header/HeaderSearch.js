import React, { useState } from 'react'
import InputBase from '@material-ui/core/InputBase'
import { fade, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import HeaderSearchList from './HeaderSearchList'

const useStyles = makeStyles(theme => ({
  Search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  SearchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  InputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
}))

const HeaderSearch = () => {
  const classes = useStyles()

  // State for search query
  const [query, setQuery] = useState('')

  const onKeyDown = (event) => {
    // Set search query if enter key is pressed
    if (event.keyCode === 13) {
      setQuery(event.target.value)
    }
  }

  return (
    <>
      <div className={classes.Search}>
        <div className={classes.SearchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder='Search…'
          classes={{
            input: classes.InputInput
          }}
          inputProps={{ 'aria-label': 'search' }}
          id='search'
          onKeyDown={onKeyDown}
        />
      </div>
      <HeaderSearchList setQuery={setQuery} query={query} />
    </>
  )
}
export default HeaderSearch
