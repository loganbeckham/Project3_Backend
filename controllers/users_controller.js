const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/user.js')

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next()
    } else {
      res.redirect('/sessions/new')
    }
  }

users.get('/new', (req, res) => {
  res.render('users/new.ejs')
})

users.post('/', (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    console.log('user is created', createdUser)
    res.redirect('/')
  })
})

location.get('/:id', (req, res) => {
    if (req.session.currentUser) {
      Location.findById(req.params.id, (error, foundLocation) => {
        res.render('locations/show.js', {
          location: foundLocation,
          currentUser: req.session.currentUser
        })
      })
    } else {
      res.redirect('/sessions/new')
    }
  })


module.exports = users