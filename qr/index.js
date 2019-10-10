const express = require('express')
const fetch = require('node-fetch')

const app = express()
app.get('/qr/:id', (req, res) => {
  fetch(`${req.protocol}://${req.headers.host}/api`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: `{ station (id: "${req.params.id}") { redirect_document { link } } }` })
  })
    .then(result => result.json())
    .then(result => res.redirect(result.data.station.redirect_document.link))
})

// const fetch = require('node-fetch')

// module.exports = (req, res) => {
//   console.log(req.query)
//   fetch(`https://${req.headers.host}/api`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ query: `{ station (id: "${req.query.id}") { redirect_document { link } } }` })
//   })
//     .then(result => result.json())
//     .then(result => res.redirect(result.data.station.redirect_document.link))
// }

module.exports = app
