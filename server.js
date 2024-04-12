const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const path = require('path')
const oneDay = 1000 * 60 * 60 * 24
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require("method-override")
const flash = require('express-flash')
const logger = require('morgan')
const { connectDB, sessionStore } = require('./config/database')
const mainRoutes = require('./routes/main')
const reservationRoutes = require('./routes/reservations')
const userRoutes = require('./routes/users')
const inventoryRoutes = require('./routes/inventory')

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
app.set('layout', 'layout')

// Use forms for put / delete
app.use(methodOverride('_method'))

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: oneDay },
      store: sessionStore,
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/inventory', inventoryRoutes)
app.use('/users', userRoutes)
app.use('/reservations', reservationRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    