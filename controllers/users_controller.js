const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/user.js')


users.get('/new', (req, res) => {
    res.send(req.session.currentUser)
})

users.post('/', (req, res) => {
    //overwrite the user password with the hashed password, then pass that in to our database
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) => {
      console.log('user is created', createdUser)
      if(!createdUser){
        req.session.currentUser = 'User already exists. Please try a different username.'
        res.send(req.session.currentUser)
      }else{
        req.session.currentUser = 'created user'
        res.send(req.session.currentUser)
      }
      
    })
  })




module.exports = users