const { SchemaDirectiveVisitor, ForbiddenError } = require('apollo-server-micro')
const { defaultFieldResolver } = require('graphql')

// Custom directive to check if user is authenicated
class isAuthenticated extends SchemaDirectiveVisitor {
  // Field definition directive
  visitFieldDefinition (field) {
    // Get field resolver
    const { resolve = defaultFieldResolver } = field

    field.resolve = async function (...args) {
      // Check if user email is in context
      if (!args[2].email) {
        throw new ForbiddenError('You are not authorized for this ressource.')
      }

      // Resolve field
      return resolve.apply(this, args)
    }
  }
}

// Custom directive to check if user has role
class hasRole extends SchemaDirectiveVisitor {
  // Field definition directive
  visitFieldDefinition (field) {
    // Get field resolver
    const { resolve = defaultFieldResolver } = field

    // List of roles from directive declaration
    const roles = this.args.roles

    field.resolve = async function (...args) {

      // Get context
      const [, , context] = args

      // Check if user email is in context
      if (roles.indexOf(context.role) === -1) {
        throw new ForbiddenError('You are not authorized for this ressource.')
      }

      // Resolve field
      return resolve.apply(this, args)
    }
  }
}

module.exports = { isAuthenticated: isAuthenticated, hasRole: hasRole }
