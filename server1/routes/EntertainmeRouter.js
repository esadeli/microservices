'use strict'

const express = require('express')
const router = express.Router()
const EntertainmeController = require('../controllers/EntertainmeController')
const {get, addmovie} = EntertainmeController

router.get('/', get)
      .post('/addmovie', addmovie)


module.exports = router