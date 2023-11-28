const express = require('express')
const morgan = require('morgan')
const trainings = require('./routes/trainings')
const errorHandler = require('./middleware/error')
require('dotenv').config() // A .env fájlt olvassa
const app = express()
app.listen(process.env.PORT, () =>
    console.log(`Server is running on port ${process.env.PORT}`)
)
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString)
const database = mongoose.connection
database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log(`Database Connected ${database.host}`)
})
app.use(express.json())

// const logger = (req, res, next) => {
//     req.hello = 'Hello World!'
//     console.log('Middleware ran.')
//     next()
// }
// app.use(logger)
app.use(morgan('dev'))

app.use('/api/trainings', trainings)
app.use(errorHandler)
