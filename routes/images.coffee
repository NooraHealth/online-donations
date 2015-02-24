express = require 'express'
router = express.Router()
MyFS= require '../lib/MyFs'
Q = require 'q'

router.get '/:image', (req, res) ->
  console.log "getting image1"
  console.log "promisify"
  imgName = req.params.image
  MyFS.readFile './public/images/' + imgName
    .then (img)->
      res.writeHead 200, {'Content-Type': 'image/gif'}
      res.end img, 'binary'
    .catch (err) ->
      console.log err
      res.send err

module.exports = router
