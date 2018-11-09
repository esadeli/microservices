'use strict'

const express = require('express')
const router = express.Router()
const TvseriesController = require('../controllers/TvseriesController')
const {add, all} = TvseriesController

router.get('/', all)
      .post('/', add)


module.exports = router