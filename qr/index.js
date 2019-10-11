const express = require('express')
const fetch = require('node-fetch')

const app = express()
app.get('/qr/:id', async (req, res) => {
  try {
    const response = await fetch(`${req.headers['x-forwarded-proto']}://${req.headers['x-forwarded-host']}/api`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: `{ redirectLink (id: "${req.params.id}") { url } }` })
    })
    const text = await response.text()
    const json = JSON.parse(text)
    res.redirect(json.data.redirectLink.url)
  } catch (error) { console.log(error) }
})

module.exports = app
