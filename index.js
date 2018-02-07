const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config.json')
const expressPromise = require('express-promise')
const Root = require('./lib/root')
const Bot = require('./lib/bot')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extened: true }))
app.use(expressPromise())

const root = new Root(config['root-app-id'], config['root-app-secret'])
const bot = new Bot(root)

app.post('/bot', (req, res) => res.json(bot.respond(req.body)))

app.listen(3000, () => console.log('App listening on port 3000!'))
