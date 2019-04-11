const express = require('express')
const app = express()
const port = 4500
const PlayerCtrl = require('./PlayerCtrl')
const FactionCtrl = require('./FactionCtrl')

app.use(express.json())

app.listen(port, () => {
    console.log('server listening on ', port)
})

app.get('/request/players', PlayerCtrl.read)

app.get('/request/factions', FactionCtrl.read)

app.post('/directive/players', PlayerCtrl.newPlayer)

app.get('/api/start', (req, res) => {res.send('server connected')})

app.delete('/directive/players/:id', PlayerCtrl.remove)

