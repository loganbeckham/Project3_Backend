const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/user.js')

sessions.get('/new', (req, res) => {
    res.send(req.session.currentUser)
})

// on sessions form submit (log in)
sessions.post('/', (req, res) => {

  // Step 1 Look for the username
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    // Database error
    if (err) {
      console.log(err)
      res.send('oops the db had a problem')
    } else if (!foundUser) {
      // if found user is undefined/null not found etc
      req.session.currentUser = 'no user'
      res.send(req.session.currentUser)
    } else {
      // user is found yay!
      // now let's check if passwords match
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        // add the user to our session
        req.session.currentUser = foundUser
        // redirect back to our home page
        res.send(req.session.currentUser)
      } else {
        // passwords do not match
        res.send('<a href="/"> password does not match </a>')
      }
    }
  })
})

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.send(req.session.currentUser)
  })
})

module.exports = sessions
