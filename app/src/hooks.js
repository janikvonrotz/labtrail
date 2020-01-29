import { useState, useEffect } from 'react'

const useSortBy = (data) => {
  const [sortBy, setState] = useState(data)

  const setSortBy = (newSortBy) => {
    // Toggle order if existing and new or state sortBy are the same
    if (JSON.stringify(newSortBy) === JSON.stringify(sortBy) && newSortBy.order === 'ASC') {
      newSortBy.order = 'DESC'
    }
    setState(newSortBy)
  }

  return [sortBy, setSortBy]
}

const useForm = (callback, data) => {
  const [values, setValues] = useState(data)

  const handleChange = (event) => {
    if (event.persist) {
      event.persist()
    }
    if (event.target.type === 'checkbox') {
      setValues(values => ({
        ...values,
        [event.target.name]: event.target.checked
      }))
    } else {
      setValues(values => ({
        ...values,
        [event.target.name]: event.target.value
      }))
    }
  }

  const handleSubmit = (event, onSubmit) => {
    event.preventDefault()
    callback(values)
  }

  return [
    values,
    handleChange,
    handleSubmit
  ]
}

const useToggle = (data) => {
  const [active, setActive] = useState(data)

  const toggle = (event) => {
    if (event) event.preventDefault()
    setActive(!active)
  }

  return [
    active,
    toggle
  ]
}

const useDebounce = (value, delay) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler)
      }
    },

    [value, delay] // Only re-call effect if value or delay changes
  )

  return debouncedValue
}

export {
  useSortBy,
  useForm,
  useToggle,
  useDebounce
}
