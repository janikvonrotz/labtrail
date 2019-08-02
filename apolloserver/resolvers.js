const { mongo, prepare } = require('mongo')
const { ObjectId } = require('mongodb')
const { GraphQLScalarType } = require('graphql')

// Function to access stations collection
const stationsCollection = async() => {
	const db = await mongo()
	return await db.collection('stations')
}

// Resolve GraphQL queries, mutations and graph paths
const resolvers = {
	Query: {
		stations: async (root, args, context) => {

			// Open database connection, access stations collection and return all documents
			return (await (await stationsCollection()).find({}).toArray()).map(prepare)
		},
		station: async (root, args, context) => {

			// Open database connection, access stations collection and return one document
			return prepare(await (await stationsCollection()).findOne({ _id: ObjectId(args.id) }))
		}
	},
	Mutation: {
		createStation: async (root, args, context) => {

			// Set default values
			args.created = new Date()
			args.created_by = "system"

			// Add new document and return it
			return prepare((await (await stationsCollection()).insertOne(args)).ops[0])
		},
		updateStation: async (root, args, context) => {

			// Set default values
			args.updated = new Date()
			args.updated_by = "system"

			// Create update filter
			let filter = { _id: ObjectId(args.id) }

			// Remove id property
			delete args.id

			// Return success response
			return { success: (await (await stationsCollection()).updateOne(filter, { $set: args })).result.ok }
		},
		deleteStation: async (root, args, context) => {

			// Convert id property name
			args._id = ObjectId(args.id)
			delete args.id
			
			// Return succcess response
			return { success: (await (await stationsCollection()).deleteOne(args)).result.ok }
		},
	},
	Date: new GraphQLScalarType({
		name: 'Date',
		description: 'Date custom scalar type',
		parseValue(value) {
			return new Date(value) // Value from the client
		},
		serialize(value) {
			return value.toUTCString() // Value sent to the client
		},
		// Parse abstract syntax tree
		parseLiteral(ast) {
			if (ast.kind === Kind.INT) {
				return new Date(ast.value) // Ast value is always in string format
			}
			return null
		},
	}),
}

module.exports = resolvers
