
express = require 'express'
router = express.Router()

# Logout the donor 
router.post('/', (req, res) ->
  console.log 'loggin out'
  req.logout()
  res.send {success: "You have been successfully logged out"}
)


module.exports = router
