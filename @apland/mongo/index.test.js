const { collection, prepare } = require('./index')
const test = require('ava')
const { ObjectId } = require('mongodb')

// Load environment configuration
require('dotenv').config({ path: `${__dirname}/.env.${process.env.NODE_ENV}` })

test.serial('Create, get and delete tenant Acme', async t => {
  var args = {
    name: 'Acme',
    created: new Date()
  }
  const tenant = prepare((await (await collection('tenants')).insertOne(args)).ops[0])
  t.assert(ObjectId.isValid(tenant.id))

  const result = prepare(await (await collection('tenants')).findOne({ _id: ObjectId(tenant.id) }))
  t.is(result.name, 'Acme')

  args = {
    _id: ObjectId(tenant.id)
  }
  t.assert((await (await collection('tenants')).deleteOne(args)).result.ok)
})
