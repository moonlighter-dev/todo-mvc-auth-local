const passport = require('passport')
const jwt = require('jsonwebtoken');
const validator = require('validator')
const User = require('../models/User')

 exports.getLogin = (req, res) => {
    if (req.user) {
      if (req.user.status === 'admin') {
        return res.json({
          message: 'Admin logged in',
          user: req.user,
        })
      }
      return res.json({
        message: 'User logged in', 
        user: req.user,
    })
    }
    res.json({
      message: 'Login initiated!', 
      user: req.user,
    })
  }
  
  exports.postLogin = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.json({
        message: 'Validation Errors present'
      })
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info)
        return next('This user does not exist')
      }
      req.login(user, {
        session: false
      },
      async (err) => {
        if (err) { return next(err) }
        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, 'TOP_SECRET');
        req.flash('success', { msg: 'Success! You are logged in.' })
        return res.json({ token })
      })
    })(req, res, next)
  }
  
  exports.logout = (req, res) => {
    req.logout(() => {
      console.log('User has logged out.')
    })
  }
  
  exports.getSignup = (req, res) => {
    if (req.user) {
      if (req.user.status === 'admin') {
        return res.json ({
          message: 'Administrator detected, welcome She Ra',
          user: req.user
        })
      }
      return res.json({
        message: 'User signed in',
        user: req.user
      })
    }
    res.json({
      message: 'Create Account',
      user: req.user,
    })
  }
  
  exports.postSignup = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('../signup')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      idScan: req.body.idScan,
      status: req.body.status,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password
    })

    // console.log(user)
  
    User.findOne({ email: user.email }, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address already exists.' })
        return res.json({
          message: 'Could not create account with duplicate email',
          email: user.email,
        })
      }
      user.save((err) => {
        if (err) { return next(err) }
        req.login(user, (err) => {
          if (err) {
            return next(err)
          }
          res.json(user)
        })
      })
    })
  }