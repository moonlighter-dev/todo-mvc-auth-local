const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const methodOverride = require("method-override")
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const appointmentRoutes = require('./routes/appointments')
const patientRoutes = require('./routes/patients')
const todoRoutes = require('./routes/todos')

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
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)
app.use('/patients', patientRoutes)
app.use('/appointments', appointmentRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    