'use strict'

const express = require('express')
const router = express.Router()
const TvseriesController = require('../controllers/TvseriesController')
const {add, all} = TvseriesController
const serverAuth = require('../middlewares/serverAuth')

router.get('/', serverAuth, all)
      .post('/', serverAuth, add)


module.exports = router