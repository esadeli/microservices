'use strict'

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

const MovieRouter = require('./routes/MovieRouter')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use('/entertainme', MovieRouter)

app.get('/', () => {res.send('OK')})
app.listen(process.env.PORT || 3000, ()=>{
    console.log('Listen to PORT ',process.env.PORT)
})