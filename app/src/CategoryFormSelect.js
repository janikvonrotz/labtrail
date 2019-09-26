import React from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import Error from './Error'
import Loading from './Loading'
import { makeStyles } from '@material-ui/core/styles'
import { GET_CATEGORIES } from './queries'
import { useQuery } from '@apollo/react-hooks'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1, 0)
  }
}))

const CategoryFormSelect = ({ value, onChange }) => {
  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_CATEGORIES)

  if (loading) return <Loading />
  if (error) return <Error message={error.message} />

  return (

    <FormControl fullWidth required className={classes.formControl}>
      <InputLabel htmlFor='category'>Category</InputLabel>
      <Select
        native
        inputProps={{
          name: 'category',
          id: 'category'
        }}
        value={value || ''}
        onChange={onChange}
      >
        {!value ? <option value='' /> : null}
        {data.categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </Select>
    </FormControl>
  )
}

CategoryFormSelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default CategoryFormSelect
