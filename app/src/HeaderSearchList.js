import React from 'react'
import { SEARCH } from './queries'
import { useQuery } from '@apollo/react-hooks'
import PropTypes from 'prop-types'

const HeaderSearchList = ({ query }) => {
  const { data } = useQuery(SEARCH, { variables: { query: query } })

  console.log(data, query)

  return (
    <>
    </>
  )
}

HeaderSearchList.propTypes = {
  user: PropTypes.string
}

export default HeaderSearchList
