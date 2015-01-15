express = require('express')
router = express.Router()
passport = require 'passport'

router.post '/' , passport.authenticate('local', \
    {successRedirect: '/donorConsole', failureRedirect: '/', \
      failureFlash:true, successFlash: "Welcome back!"})

module.exports = router
