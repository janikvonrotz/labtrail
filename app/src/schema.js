import gql from 'graphql-tag'

// Local state schema
const typeDefs = gql`

enum AlertType {
    SUCCESS
    ERROR
}

type Alert {
  message: String!
  type: AlertType!
}

extend type Query {
  alert: Alert
}

extend type Mutation {
  createAlert(message: String!, type: AlertType!): Alert
  deleteAlert: null
}
`

export default typeDefs
