const express = require('express')
const app = express()
const cors = require('cors')
const flash = require('express-flash')
const logger = require('morgan')
const { connectDB } = require('./config/database')
const apiRoutes = require('./routes/api')

require('dotenv').config({path: './config/.env'})

connectDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
app.use(cors)

app.use(flash())
  
app.use('/api', apiRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${PORT}, you better catch it!`)
})