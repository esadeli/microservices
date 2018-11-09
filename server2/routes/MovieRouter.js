'use strict'

const express = require ('express')
const router = express.Router()
const MovieController = require('../controllers/MovieController')
const {add,get} = MovieController
const serverAuth = require('../middlewares/serverAuth')

router.get('/', serverAuth, get)
      .post('/', serverAuth, add)

module.exports = router