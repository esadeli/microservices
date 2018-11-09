'use strict'

const axios = require('axios')
const redis = require('redis'),
      client = redis.createClient()

module.exports = {
    get: function (req,res) {
      // check if cache is exist 
      client.get('entertainme',(err,reply)=>{
        if(reply){
          let reply1 = JSON.parse(reply)
          // console.log('------get redis--------', reply1)
          res.status(200).json(reply1)
        } else if(reply === null){
          
          // get all data
          getentertainmedata(req,res)

        } else {
          console.log('ERROR Get Redis ', err)
        }
      })
    },
    addmovie: function (req,res) {
      axios({
        method: 'POST',
        url: 'http://localhost:3001/movies',
        data: {
          title: req.body.title,
          overview: req.body.overview,
          poster_path: req.body.poster_path,
          status: req.body.status,
          popularity: req.body.popularity,
          tag: req.body.tag
        }
      })
        .then(movies => {
          let newmovies = movies.data
          
          // console.log('movies data--------', newmovies)
          getentertainmedata(req,res)

          res.status(201).json(newmovies)
        })
        .catch(error => {
          res.status(500).json({
            msg: 'ERROR Create Movies from Server 1',
            err: error
          })
        })
    },
    addtvseries: function (req,res) {
      axios({
        method: 'POST',
        url: 'http://localhost:3002/tvseries',
        data: {
          title: req.body.title,
          overview: req.body.overview,
          poster_path: req.body.poster_path,
          status: req.body.status,
          popularity: req.body.popularity,
          tag: req.body.tag
        }
      })
        .then(tvseries => {
          let newseries = tvseries.data
          
          getentertainmedata(req,res)

          res.status(201).json(newseries)
        })
        .catch(error => {
          res.status(500).json({
            msg: 'ERROR Create TV Series from Server 1',
            err: error
          })
        })
    }
}

//--------------- get all data --------
function getentertainmedata (req,res) {
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
        let entertainmedata = {
            movies: moviedata,
            series: seriesdata
        }
        // console.log('no redis--------')
        
        // assuming data is not in cache, so we need to set it up
        client.set('entertainme', JSON.stringify(entertainmedata),'EX',10)

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
}