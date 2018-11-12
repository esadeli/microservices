'use strict'

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
//mongoose.connect('mongodb://localhost:27017/server3db', {useNewUrlParser: true})
mongoose.connect(process.env.MONGO_USER, {useNewUrlParser: true})
const TvseriesRouter = require('./routes/TvseriesRouter')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/tvseries', TvseriesRouter)

app.get('/', (req,res) => {res.send('OK TV Series')})
app.listen(process.env.PORT, ()=> {
    console.log('Listening to PORT ',process.env.PORT)
})
