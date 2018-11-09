'use strict'

const express = require('express')
const router = express.Router()
const EntertainmeController = require('../controllers/EntertainmeController')
const {get} = EntertainmeController

router.get('/', get)


module.exports = router