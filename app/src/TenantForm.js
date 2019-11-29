import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import { useForm, useToggle } from './hooks'
import { makeStyles } from '@material-ui/core/styles'
import Prompt from './Prompt'
import UserFormList from './UserFormList'
import UserSelectList from './UserSelectList'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(2, 0)
  }
}))

const TenantForm = ({ children, tenant, onSubmit }) => {
  const classes = useStyles()

  const { values, handleChange, handleSubmit } = useForm(onSubmit, tenant)
  const [selectedUsers, setSelectedUsers] = React.useState(tenant.assigned_users)
  const { toggle, active } = useToggle(false)

  const handleSelectedUsers = () => {
    // Set users array of tenant
    const event = { target: { name: 'assigned_users', value: selectedUsers.map(({ id }) => id) } }
    handleChange(event)
    toggle()
  }

  const resetSelectedUsers = () => {
    setSelectedUsers(tenant.assigned_users)
    toggle()
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        variant='standard'
        margin='normal'
        required
        fullWidth
        id='name'
        name='name'
        label='Name'
        type='text'
        value={values.name}
        onChange={handleChange}
        autoFocus
      />
      <Typography className={classes.title} variant='h4' component='h2'>
        Users
      </Typography>
      <Button
        variant='contained'
        color='primary'
        className={classes.button}
        onClick={toggle}
      >
        Select
      </Button>
      <Prompt
        title='Select Users'
        content='Please select users to tenant access:'
        open={active}
        onSubmit={handleSelectedUsers}
        onClose={resetSelectedUsers}
        confirmLabel='Ok'
      >
        <UserSelectList
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
      </Prompt>
      <UserFormList users={selectedUsers} />
      {children}
    </form>
  )
}

TenantForm.propTypes = {
  tenant: PropTypes.object,
  children: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default TenantForm
