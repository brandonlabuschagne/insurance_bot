const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config.json')
const app = express()
const expressPromise = require('express-promise')
const Root = require('./lib/root')

app.use(bodyParser.json())
app.use(expressPromise())
app.use(bodyParser.urlencoded({ extened: true }))

const root = new Root(config['root-app-id'], config['root-app-secret'])

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/bot', (req, res) => {
    res.json()
})

app.get('/models', (req, res) => res.json(root.getModels()))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
