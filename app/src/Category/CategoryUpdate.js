import React from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import CategoryForm from './CategoryForm'
import CategoryDelete from './CategoryDelete'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_CATEGORY, GET_CATEGORIES, CREATE_ALERTCLIENT } from '../queries'
import { makeStyles } from '@material-ui/core/styles'
import Error from '../Error'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1, 1, 1, 0)
  }
}))

const CategoryUpdate = ({ category }) => {
  const classes = useStyles()

  const [createAlert] = useMutation(CREATE_ALERTCLIENT)
  // Get hook for Category update
  const [updateCategory, { data, error }] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [{
      query: GET_CATEGORIES
    }],
    onCompleted: () => createAlert({ variables: { message: 'Category saved!', type: 'SUCCESS' } })
  })

  if (error) return <Error message={error.message} />

  // Redirect if update is successful
  if (data && data.updateCategory.success) {
    return <Redirect to='/categories' />
  }

  // Form on submit method
  function onSubmit(category) {
    updateCategory({ variables: category })
  }

  return (
    <CategoryForm category={category} onSubmit={onSubmit}>
      <Button
        variant='contained'
        color='primary'
        type='submit'
        className={classes.button}
      >
        Save
      </Button>
      <Link to='/categories'>
        <Button
          variant='outlined'
          color='secondary'
          className={classes.button}
        >
          Cancel
        </Button>
      </Link>
      <CategoryDelete category={category} />
    </CategoryForm>
  )
}

CategoryUpdate.propTypes = {
  category: PropTypes.object.isRequired
}

export default CategoryUpdate
