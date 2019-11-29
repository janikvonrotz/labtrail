import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Error from './Error'
import Loading from './Loading'
import { GET_USERS } from './queries'
import { useQuery } from '@apollo/react-hooks'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}))

const UserSelectList = ({ selectedUsers, setSelectedUsers }) => {
  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_USERS)

  if (loading) return <Loading />
  if (error) return <Error message={error.message} />

  const handleToggle = user => () => {
    // Check if user is selected by id property
    const currentIndex = selectedUsers.findIndex((selectedUser) => (user.id === selectedUser.id))
    const newSelectedUsers = [...selectedUsers]

    if (currentIndex === -1) {
      newSelectedUsers.push(user)
    } else {
      newSelectedUsers.splice(currentIndex, 1)
    }

    setSelectedUsers(newSelectedUsers)
  }

  return (
    <List className={classes.root}>
      {data.users.map(user => {
        const labelId = `checkbox-list-label-${user.id}`

        return (
          <ListItem key={user.id} dense button onClick={handleToggle(user)}>
            <ListItemIcon>
              <Checkbox
                edge='start'
                checked={selectedUsers.findIndex((selectedUser) => (user.id === selectedUser.id)) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${user.firstname} ${user.lastname} (${user.email})`} />
          </ListItem>
        )
      })}
    </List>
  )
}

export default UserSelectList
