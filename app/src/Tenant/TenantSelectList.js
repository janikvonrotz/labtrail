import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Error from '../Error'
import Loading from '../Loading'
import { GET_TENANTS } from '../queries'
import { useQuery } from '@apollo/react-hooks'
import { compareValues } from '../helpers'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}))

const TenantSelectList = ({ selectedTenants, setSelectedTenants }) => {
  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_TENANTS)

  if (loading) return <Loading />
  if (error) return <Error message={error.message} />

  const handleToggle = tenant => () => {
    // Check if tenant is selected by id property
    const currentIndex = selectedTenants.findIndex((selectedTenant) => (tenant.id === selectedTenant.id))
    const newSelectedTenants = [...selectedTenants]

    if (currentIndex === -1) {
      newSelectedTenants.push(tenant)
    } else {
      newSelectedTenants.splice(currentIndex, 1)
    }

    setSelectedTenants(newSelectedTenants)
  }

  // Sort tenants by name
  data.tenants.sort(compareValues('name'))

  return (
    <List className={classes.root}>
      {data.tenants.map(tenant => {
        const labelId = `checkbox-list-label-${tenant.id}`

        return (
          <ListItem key={tenant.id} dense button onClick={handleToggle(tenant)}>
            <ListItemIcon>
              <Checkbox
                edge='start'
                checked={selectedTenants.findIndex((selectedTenant) => (tenant.id === selectedTenant.id)) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${tenant.title} (${tenant.category.name})`} />
          </ListItem>
        )
      })}
    </List>
  )
}

export default TenantSelectList
