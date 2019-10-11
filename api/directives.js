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
      if (!args[2].user.email) {
        throw new ForbiddenError('You are not authorized for this ressource.')
      }

      // Resolve field
      return resolve.apply(this, args)
    }
  }
}

// Custom directive to check if user has role
class hasRole extends SchemaDirectiveVisitor {

  visitFieldDefinition (field) {
    // Get field resolver
    const { resolve = defaultFieldResolver } = field

    // List of roles from directive param
    const roles = this.args.roles

    field.resolve = async function (...args) {
      // Get context
      const [, , context] = args

      // User must exist in contest and roles must match
      if (!context.user || roles.indexOf(context.user.role) === -1) {
        throw new ForbiddenError('You are not authorized for this ressource.')
      }

      // Resolve field
      return resolve.apply(this, args)
    }
  }
}

module.exports = { isAuthenticated: isAuthenticated, hasRole: hasRole }
