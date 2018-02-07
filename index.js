const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config.json')
const app = express()
const Root = require('./lib/root')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extened: true }))

const root = new Root(config['root-app-id'], config['root-app-secret'])

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/:name', (req, res) => {
    const name = req.params.name
    res.send(`Hello ${name}!`)
})

app.post('/bot', (req, res) => {
    res.json()
})

app.get('/models', (req, res) => res.json(root.models))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
