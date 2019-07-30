const fs = require('fs')
const { join } = require('path')
const bodyParser = require('body-parser')
const saml = require('samlify')
const express = require('express')
const router = express.Router()
const ServiceProvider = saml.ServiceProvider
const IdentityProvider = saml.IdentityProvider
const app = express()

// Configure your endpoint for IdP-initiated / SP-initiated SSO
const sp = ServiceProvider({
    metadata: fs.readFileSync(join(__dirname, 'sp.xml'), 'utf8')
})
const idp = IdentityProvider({
    metadata: fs.readFileSync(join(__dirname, 'idp.xml'), 'utf8')
})

// Release the metadata publicly
router.get('/metadata', (req, res) => res.header('Content-Type', 'text/xml').send(sp.getMetadata()))

// Access URL for implementing SP-init SSO
router.get('/spinitsso-redirect', (req, res) => {
    const { id, context } = sp.createLoginRequest(idp, 'redirect')
    return res.redirect(context)
})

// If your application only supports IdP-initiated SSO, just make this route is enough
// This is the assertion service url where SAML Response is sent to
router.post('/acs', async (req, res) => {

    try {
        const { id, context: SAMLResponse } = await sp.createLoginRequest(idp, 'post')
        console.log(SAMLResponse)
        const { extract } = await sp.parseLoginResponse(idp, 'post', { body: { SAMLResponse }})
        console.log(extract.attributes)
        /**
        *
        * Implement your logic here. 
        * extract.attributes, should contains : firstName, lastName, email, uid, groups 
        *           
        **/
      } catch (e) {
        console.error('[FATAL] when parsing login response sent from OneLogin', e)
        return res.redirect('/')
      }
})

app.use('/sso', router)

module.exports = app
