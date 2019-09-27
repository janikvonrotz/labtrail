const resolvers = {
  Mutation: {
    createAlert: (obj, args, { cache }) => {
      cache.writeData({ data: { alert: { __typename: 'Alert', ...args } } })
    },
    deleteAlert: (obj, args, { cache }) => {
      cache.writeData({ data: { alert: null } })
    }
  }
}
export default resolvers
