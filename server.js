const express = require('express')
const app = express()
const path = require('path')
const oneDay = 1000 * 60 * 60 * 24
const mongoose = require('mongoose')
const passport = require('passport')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const logger = require('morgan')
const { connectDB, sessionStore } = require('./config/database')
const apiRoutes = require('./routes/api')

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))


// Passport middleware
app.use(passport.initialize())

app.use(flash())
  
app.use('/api', apiRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})