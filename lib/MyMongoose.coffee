
Q = require 'q'

###
# My promise wrappers around the Mongoose library
###
class MyMongoose
  
  findOne: (model, filter) ->
    deferred = Q.defer()
    
    model.findOne filter, (err, result) ->
      if err
        deferred.reject err
      else
        deferred.resolve result

    return deferred.promise

  count: (model, filter) ->
    deferred = Q.defer()
    
    model.count filter, (err, result) ->
      if err
        deferred.reject err
      else
        deferred.resolve result

    return deferred.promise


module.exports = new MyMongoose
