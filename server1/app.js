'use strict'

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const eGraphQL = require('express-graphql')
const schema = require('./schema/index')

//const EntertainmeRouter = require('./routes/EntertainmeRouter')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
// app.use('/entertainme', EntertainmeRouter)
app.use('/graphql', eGraphQL({
    schema,
    graphiql: true
}))


// app.get('/', () => {res.send('OK')})
app.listen(process.env.PORT || 3000, ()=>{
    console.log('Listen to PORT ',process.env.PORT)
})