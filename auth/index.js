const fs = require('fs')
const { join } = require('path')
const saml = require('samlify')
const express = require('express')
const jwt = require('jsonwebtoken')

// Load env config
require('dotenv').config()

// Initialize SAML SP and IdP
const ServiceProvider = saml.ServiceProvider
const IdentityProvider = saml.IdentityProvider

// Configure your endpoint for IdP-initiated / SP-initiated SSO
const sp = ServiceProvider({
  metadata: fs.readFileSync(join(__dirname, 'sp.xml'), 'utf8')
})
const idp = IdentityProvider({
  metadata: fs.readFileSync(join(__dirname, 'idp.xml'), 'utf8')
})

// Create SSO router
const router = express.Router()

// Release the metadata publicly
router.get('/metadata', (req, res) => res.header('Content-Type', 'text/xml').send(sp.getMetadata()))

// Access URL for implementing SP-init SSO
router.get('/spinitsso-redirect', (req, res) => {
  const { context } = sp.createLoginRequest(idp, 'redirect')
  return res.redirect(context)
})

// If your application only supports IdP-initiated SSO, just make this route is enough
// This is the assertion service url where SAML Response is sent to
router.post('/acs', async (req, res) => {
  try {
    const { context: SAMLResponse } = await sp.createLoginRequest(idp, 'post')
    console.log(SAMLResponse)
    const { extract } = await sp.parseLoginResponse(idp, 'post', { body: { SAMLResponse } })
    console.log(extract.attributes)

    // Implement your logic here.
    // extract.attributes, should contains : firstName, lastName, email, uid, groups
  } catch (e) {
    console.error('[FATAL] when parsing login response sent from OneLogin', e)
    return res.redirect('/')
  }
})

// Generate JWT mock token
router.get('/get-mock-token', (req, res) => {
  // Get email from query param
  const email = req.query.email

  // Send error if no email
  if (!email) {
    res.status(500).send('No email param set.')
  }

  // Generate token
  const token = jwt.sign({ email: email }, process.env.JWT_SECRET)

  // Return token
  res.send(token)
})

// Add SSO router to express app
const app = express()
app.use('/sso', router)

module.exports = app
