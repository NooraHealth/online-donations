
Q = require 'q'

###
# My promise wrappers around the Mongoose library
###
class MyMongoose
  
  exists: (model, filter) ->
    deferred = Q.defer()
    
    model.findOne filter, (err, result) ->
      console.log "figuring out if model exists"
      console.log result
      if err
        deferred.reject err
      else if result
        deferred.resolve true
      else
        deferred.resolve false

    return deferred.promise

  findOne: (model, filter) ->
    deferred = Q.defer()
    
    model.findOne filter, (err, result) ->
      if err
        deferred.reject err
      else
        deferred.resolve result

    return deferred.promise

  findOneAndRemove: (model, filter) ->
    console.log "removing a donor"
    deferred = Q.defer()
    
    model.findOneAndRemove filter, (err, result) ->
      if err
        deferred.reject err
      else
        deferred.resolve result

    return deferred.promise

  save: (model) ->
    deferred = Q.defer()
    
    model.save (err) ->
      if err
        deferred.reject err
      else
        deferred.resolve model

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
