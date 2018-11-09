'use strict'

const express = require('express')
const router = express.Router()
const EntertainmeController = require('../controllers/EntertainmeController')
const {get, addmovie, addtvseries} = EntertainmeController

router.get('/', get)
      .post('/addmovie', addmovie)
      .post('/addtvseries', addtvseries)


module.exports = router