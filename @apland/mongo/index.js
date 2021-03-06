// Import Dependencies
const url = require('url')
const MongoClient = require('mongodb').MongoClient

// Create cached connection variable
let cachedDb = null

// A function for connecting to MongoDB,
// taking a single paramater of the connection string
async function connectToDatabase (uri) {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb
  }

  // If no connection is cached, create a new one
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  // Select the database through the connection,
  // using the database path of the connection string
  const db = await client.db(url.parse(uri).pathname.substr(1)) // eslint-disable-line

  // Cache the database connection and return the connection
  cachedDb = db
  return db
}

// Convert MongoDB object
function prepare (object) {
  if (object) {
    object.id = object._id.toString()
  }
  return object
}

// The main function of the endpoint
// dealing with the request and subsequent response
async function mongo () {
  // Get a database connection, cached or otherwise,
  // using the connection string environment variable as the argument
  return connectToDatabase(process.env.MONGODB_URI)
}

// Function to access collection
async function collection (name) {
  const db = await mongo()
  return db.collection(name)
}

module.exports = {
  collection,
  prepare
}
