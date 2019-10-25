import { useState, useEffect } from 'react'

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

  return {
    handleChange,
    handleSubmit,
    values
  }
}

const useToggle = (data) => {
  const [active, setActive] = useState(data)

  const toggle = (event) => {
    if (event) event.preventDefault()
    setActive(!active)
  }

  return {
    toggle,
    active
  }
}

const useLocalStorage = (key, value) => {
  // State to store our value
  // Pass initial state function to useState
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initial value
      return item ? JSON.parse(item) : value
    } catch (error) {
      // If error also return initialValue
      console.log(error)
      return value
    }
  })

  // Return a wrapped version of useState's setter function that persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error)
    }
  }

  return {
    storedValue,
    setValue
  }
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
  useForm,
  useToggle,
  useLocalStorage,
  useDebounce
}
