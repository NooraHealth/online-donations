
Q = require 'q'
passport = require 'passport'
###
# Promise wrappers around passport functionality -- user authentication and registration and other
# functionality
###
class MyPassport
  
  authenticateUser: (user, password) ->
    console.log "authenticating the user via MyPassport"
    deferred = Q.defer()

    user.authenticate password, (err, donor, passwordErr) ->
      console.log "recieved an answer about "
      console.log err
      console.log donor
      console.log passwordErr
      if err
        deferred.reject err
      if passwordErr
        deferred.reject passwordErr
      else
       deferred.resolve donor

    return deferred.promise

  setPassword: (user, password) ->
    deferred = Q.defer()

    user.setPassword password, (err, donor, passwordErr) ->
      if err
        deferred.reject err
      else
        donor.save (error)->
          if error
            deferred.reject err
          else
            deferred.resolve donor

    return deferred.promise
    


module.exports = new MyPassport
