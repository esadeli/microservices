'use strict'

const express = require('express')
const router = express.Router()
const EntertainmeController = require('../controllers/EntertainmeController')
const {get, addmovie, addtvseries, getmovie, gettvseries } = EntertainmeController

router.get('/', get)
      .get('/movie', getmovie)
      .get('/tvseries', gettvseries)
      .post('/addmovie', addmovie)
      .post('/addtvseries', addtvseries)


module.exports = router