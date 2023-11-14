const express = require('express')
const morgan = require('morgan')
const trainings = require('./routes/trainings')
require('dotenv').config() // A .env fájlt olvassa
const app = express()
app.listen(process.env.PORT, () =>
    console.log(`Server is running on port ${process.env.PORT}`)
)

// const logger = (req, res, next) => {
//     req.hello = 'Hello World!'
//     console.log('Middleware ran.')
//     next()
// }
// app.use(logger)
app.use(morgan('dev'))

app.use('/api/trainings', trainings)
