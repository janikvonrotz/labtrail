import { useState } from 'react'

const useForm = (callback, data) => {
  const [values, setValues] = useState(data)

  const handleChange = (event) => {
    event.persist()
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }))
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

export { useForm }
