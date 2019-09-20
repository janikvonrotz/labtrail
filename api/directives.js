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

  visitObject (type) {
    this.ensureFieldsWrapped(type)
    type._requiredHasRole = this.args.requires
  }

  // Visitor methods for nested types like fields and arguments
  // also receive a details object that provides information about
  // the parent and grandparent types
  visitFieldDefinition (field, details) {
    this.ensureFieldsWrapped(details.objectType)
    field._requiredHasRole = this.args.requires
  }

  ensureFieldsWrapped (objectType) {
    // Mark the GraphQLObjectType object to avoid re-wrapping
    if (objectType._hasRoleFieldsWrapped) return
    objectType._hasRoleFieldsWrapped = true

    // Get fields from object type
    const fields = objectType.getFields()

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName]

      // Get field resolver
      const { resolve = defaultFieldResolver } = field

      // List of roles from directive declaration
      const roles = this.args.roles

      field.resolve = async function (...args) {

        // Get context
        const [, , context] = args

        // Check if user email is in context
        if (roles.indexOf(context.user.role) === -1) {
          throw new ForbiddenError('You are not authorized for this ressource.')
        }

        // Resolve field
        return resolve.apply(this, args)
      }
    })
  }
}

module.exports = { isAuthenticated: isAuthenticated, hasRole: hasRole }
