'use strict'

const Tvseries = require('../models/tvseries')

module.exports = {
    add: function(req,res) {
        let data = []
        req.body.tag.forEach(tag => {
            data.push({text: tag})
        });
        Tvseries.create({
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            status: req.body.status,
            popularity: req.body.popularity,
            tag: data
        })
          .then(tvseries => {
              res.status(201).json({
                  msg: 'TV Series has been created',
                  data: tvseries
              })
          })
          .catch(error => {
              res.status(500).json({
                  msg: 'ERROR Create TV Series data',
                  err: error
              })
          })
    },
    all: function (req,res) {
        Tvseries.find({})
            .then(listtvseries => {
                res.status(200).json({
                    info: 'tv found successfully',
                    data: listtvseries
                })
            })
            .catch(error => {
                res.status(500).json({
                    msg: 'List of TV Series',
                    err: error
                })
            })
    }
}