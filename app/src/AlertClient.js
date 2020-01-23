import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_ALERTCLIENT, DELETE_CLIENTALERT } from './queries'
import Alert from './Alert'

const AlertClient = () => {
  // Get category by id
  const { data } = useQuery(GET_ALERTCLIENT)
  const [deleteAlert] = useMutation(DELETE_CLIENTALERT)

  if (data && data.alert) {
    return <Alert open alert={data.alert} onClose={deleteAlert} />
  }
  return null
}

export default AlertClient
