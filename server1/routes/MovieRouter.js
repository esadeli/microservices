'use strict'

const express = require('express')
const router = express.Router()
const MovieController = require('../controllers/MovieController')
const {get} = MovieController

router.get('/', get)


module.exports = router