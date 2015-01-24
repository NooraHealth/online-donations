
express = require 'express'
router = express.Router()

# Logout the donor 
router.post('/', (req, res) ->
  console.log 'loggin out'
  req.logout()
)


module.exports = router
