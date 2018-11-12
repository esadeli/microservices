'use strict'

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/server2db',{useNewUrlParser: true})
mongoose.connect(process.env.MONGO_USER,{useNewUrlParser: true})
const app = express()
const MovieRouter = require('./routes/MovieRouter')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/movies', MovieRouter)

app.get('/', (req,res) => {res.send('OK Server Movie')})
app.listen(process.env.PORT, ()=> {
    console.log('Listening to PORT ', process.env.PORT)   
})