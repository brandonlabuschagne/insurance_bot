const express = require('express')
const bodyParser = require('body-parser')
const data = require('./data')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extened: true }))

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/:name', (req, res) => {
    const name = req.params.name
    res.send(`Hello ${name}!`)
})

app.post('/bot', (req, res) => {
    res.json()
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))