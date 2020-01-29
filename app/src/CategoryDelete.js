import React from 'react'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_CATEGORY, GET_CATEGORIES, CREATE_ALERTCLIENT } from './queries'
import { makeStyles } from '@material-ui/core/styles'
import Prompt from './Prompt'
import { useToggle } from './hooks'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1, 1, 1, 0)
  }
}))

const CategoryDelete = ({ category }) => {
  const classes = useStyles()

  const [createAlert] = useMutation(CREATE_ALERTCLIENT)
  const [deleteCategory, { data }] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [{
      query: GET_CATEGORIES
    }],
    onCompleted: () => createAlert({ variables: { message: 'Category deleted!', type: 'SUCCESS' } })
  })

  const [toggle, active] = useToggle(false)

  if (data && data.deleteCategory.success) {
    return <Redirect to='/categories' />
  }

  return (
    <>
      <Button
        variant='outlined'
        color='secondary'
        type='submit'
        className={classes.button}
        onClick={toggle}
      >
        Delete
      </Button>
      <Prompt
        title='Delete Category'
        content={`Do you really want to delete the category: ${category.name} ?`}
        open={active}
        onSubmit={event => deleteCategory({ variables: category })}
        onClose={toggle}
      />
    </>
  )
}

CategoryDelete.propTypes = {
  category: PropTypes.object.isRequired
}

export default CategoryDelete
