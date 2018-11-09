'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new Schema({
    title: String,
    overview: String,
    poster_path: String,
    status: String,
    popularity: String,
    tag:[{text: {
        type: String
    }}]
},{
    timestamps: true
})

const Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie