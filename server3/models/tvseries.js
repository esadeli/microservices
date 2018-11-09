'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TvseriesSchema = new Schema({
    title: String,
    overview: String,
    poster_path: String,
    status: String,
    popularity: String,
    tag: [{
        text: {
            type: String
        }}]
},{
    timestamps: true
})

const Tvseries = mongoose.model('Tvseries', TvseriesSchema)

module.exports = Tvseries