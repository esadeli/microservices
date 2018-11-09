'use strict'

const express = require ('express')
const router = express.Router()
const MovieController = require('../controllers/MovieController')
const {add,get} = MovieController

router.get('/', get)
      .post('/', add)

module.exports = router