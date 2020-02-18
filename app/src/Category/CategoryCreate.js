import React from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import CategoryForm from './CategoryForm'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_CATEGORY, GET_CATEGORIES, CREATE_ALERTCLIENT } from '../queries'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1, 1, 1, 0)
  }
}))

const CategoryCreate = () => {
  const classes = useStyles()

  // Set default values
  const category = { name: '' }

  const [createAlert] = useMutation(CREATE_ALERTCLIENT)
  const [createCategory, { data }] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [{
      query: GET_CATEGORIES
    }],
    onCompleted: () => createAlert({ variables: { message: 'Category created!', type: 'SUCCESS' } })
  })

  // Redirect if update is successful
  if (data && data.createCategory.id) {
    return <Redirect to='/categories' />
  }

  return (
    <CategoryForm category={category} onSubmit={(category) => (createCategory({ variables: category }))}>
      <Link to='/categories'>
        <Button
          variant='outlined'
          color='secondary'
          className={classes.button}
        >
          Cancel
        </Button>
      </Link>
      <Button
        variant='contained'
        color='primary'
        type='submit'
        className={classes.button}
      >
        Add
      </Button>
    </CategoryForm>
  )
}

export default CategoryCreate
