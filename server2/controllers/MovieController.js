'use strict'

const Movie = require('../models/movie')

module.exports = {
    add: function (req,res) {

        let dataTag = []
        req.body.tag.forEach(tag => {
           dataTag.push({text: tag}) 
        });

        Movie.create({
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            status: req.body.status,
            popularity: req.body.popularity,
            tag: dataTag
        })
            .then(movie =>{
                res.status(201).json({
                    msg: 'Movie Data created',
                    data: movie
                })
            })
            .catch(error => {
                res.status(500).json({
                    msg: 'ERROR Create Movie data',
                    err: error        
                })
            })
    },
    get: function(req,res) {
        Movie.find({})
            .then(movies => {
                res.status(200).json({
                    info: 'movies found successfully',
                    data: movies
                })
            })
            .catch(error=> {
                res.status(500).json({
                    msg: 'ERROR Display Movie data',
                    err: error
                })
            })
        }
}

// module.exports = MovieController