const express = require('express')
const router = express.Router()
module.exports = router

router.use(express.static("public/lbs/sql"))