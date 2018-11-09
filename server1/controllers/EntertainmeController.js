'use strict'

const axios = require('axios')
const redis = require('redis'),
      client = redis.createClient()

module.exports = {
    get: function (req,res) {
        let moviedata = {}
        let seriesdata = {}
        // check if cache is exist 
        client.get('entertainme',(err,reply)=>{
            if(reply){
                let reply1 = JSON.parse(reply)
                // console.log('------get redis--------', reply1)
                res.status(200).json(reply1)
            } else if(reply === null){

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
                            let entertainmedata = {
                                movies: moviedata,
                                series: seriesdata
                            }
                            // console.log('no redis--------')
                            
                            // assuming data is not in cache, so we need to set it up
                            client.set('entertainme', JSON.stringify(entertainmedata),'EX',20)

                            res.status(200).json(entertainmedata)
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
            } else {
                console.log('ERROR Get Redis ', err)
            }
        })
    }
}