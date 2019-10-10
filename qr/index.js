const express = require('express')
const fetch = require('node-fetch')

const app = express()
app.get('/qr/:id', async (req, res) => {
  try {
    const response = await fetch('https://labtrail.now.sh/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: `{ station (id: "${req.params.id}") { redirect_document { link } } }` })
    })
    console.log('RESPONSE', response)
    const text = await response.text()
    console.log('TEXT', text)
    const json = JSON.parse(text)
    console.log('JSON', json)
    res.redirect(json.data.station.redirect_document.link)
  } catch (error) { console.log(error) }
})

module.exports = app
