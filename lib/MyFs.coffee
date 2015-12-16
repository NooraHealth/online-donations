
fs = require 'fs'
Q = require 'q'

###
# My promise wrappers around the FS library
###
class MyFS
  
  readFile: (file)->
    deferred = Q.defer()

    fs.readFile file, ( err, data) ->
      if err
        deferred.reject err
      else
        deferred.resolve data

    return deferred.promise

module.exports = new MyFS
