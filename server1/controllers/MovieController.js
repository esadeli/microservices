'use strict'

const axios = require('axios')

module.exports = {
    get: function (req,res) {
        let moviedata = {}
        let seriesdata = {}

        // get movie data
        axios({
          method: 'GET',
          url: 'http://localhost:3001/movies'
        })
          .then(result => {
              moviedata = result.data

              // get series data
              axios({
                method: 'GET',
                url: 'http://localhost:3002/tvseries'
              })
                .then(series => {
                    seriesdata = series.data

                    res.status(200).json({
                        movies: moviedata,
                        series: seriesdata
                    })
                })
                .catch(error => {
                    res.status(500).json({
                       msg: 'ERROR Get series list from Server 2',
                       err: error
                    })      
                })
          })
          .catch(error => {
              res.status(500).json({
                msg: 'ERROR Get movies list from Server 2',
                err: error
              })
          })
    }
}