const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const shortnerController = require('./controllers/shortner.controller')

require('dotenv/config')

const { HTTP_PORT, MONGO_URL } = process.env

const router = require('./routes/shortner.router')

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/api', router)

app.get('/', (req, res) => {
  res.send({ message: 'Hi!' })
})

app.get('/:hash', shortnerController.redirectTo)

app.listen(HTTP_PORT, () => {
  console.log(`Running on PORT -> ${HTTP_PORT}`)
})
