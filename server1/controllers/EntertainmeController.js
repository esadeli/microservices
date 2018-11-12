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
          // getentertainmedata(resolve,reject)

        } else {
          console.log('ERROR Get Redis ', err)
        }
      })
    },
    getmovie: function (req,res) {
      let moviedata = {}
      return new Promise((resolve,reject)=> {
        client.get('moviedata', (err,reply)=>{
          if(reply){
            let reply1 = JSON.parse(reply)
            resolve(reply1)
            //res.status(200).json(reply1)
          } else if (reply === null) {
            //getmoviedata(resolve,reject)
            axios({
              method: 'GET',
              url: 'http://localhost:3001/movies',
              headers: {
                headserver: process.env.KEYSECRET
              }
            })
             .then(result => {
               moviedata = result.data
          
               // assuming data is not in cache, so we need to set it up
               client.set('moviedata', JSON.stringify(moviedata),'EX',10)
          
               //res.status(200).json(moviedata)
               resolve(moviedata)
             })
             .catch(error => {
               reject(error)
              // res.status(500).json({
              //   msg: 'ERROR Get movies list from Server 2',
              //   err: error
              // })
             })
          } else {
            console.log('ERROR Get Movie Redis ', err)
            reject(err)
          }
        })
      })
      
    },
    gettvseries: function (req,res) {
      let seriesdata = {}

      return new Promise((resolve, reject)=> {
        client.get('seriesdata', (err,reply)=>{
          if(reply){
            let reply1 = JSON.parse(reply)
            res.status(200).json(reply1)

          } else if (reply === null) {
            // gettvseriesdata(req,res)
            axios({
              method: 'GET',
              url: 'http://localhost:3002/tvseries',
              headers: {
                headserver: process.env.KEYSECRET
              }
            })
              .then(series => {
                seriesdata = series.data
                // console.log('no redis--------')
                
                // assuming data is not in cache, so we need to set it up
                client.set('seriesdata', JSON.stringify(seriesdata),'EX',10)
          
                //res.status(200).json(seriesdata)
                resolve(seriesdata)
              })
              .catch(error => {
                reject(error)
                // res.status(500).json({
                //   msg: 'ERROR Get series list from Server 3',
                //   err: error
                // })      
              })
          } else {
            console.log('ERROR Get Movie Redis ', err)
          }
        })
      })
    },
    addmovie: function (req,res) {
      axios({
        method: 'POST',
        url: 'http://localhost:3001/movies',
        headers: {
          headserver: process.env.KEYSECRET
        },
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
          // getentertainmedata(req,res)
          getmoviedata(req,res)

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
        headers: {
          headserver: process.env.KEYSECRET
        },
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
          
          // getentertainmedata(req,res)
          gettvseriesdata(req,res)

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

//---------------- get movie data --------------
function getmoviedata (req,res) {
  let moviedata = {}
  
  return new Promise ((resolve,reject)=> {
    axios({
        method: 'GET',
        url: 'http://localhost:3001/movies',
        headers: {
          headserver: process.env.KEYSECRET
        }
      })
       .then(result => {
         moviedata = result.data
    
         // assuming data is not in cache, so we need to set it up
         client.set('moviedata', JSON.stringify(moviedata),'EX',10)
    
         //res.status(200).json(moviedata)
         resolve(moviedata)
       })
       .catch(error => {
         reject(error)
        // res.status(500).json({
        //   msg: 'ERROR Get movies list from Server 2',
        //   err: error
        // })
       })
  }) 
  
  
  // axios({
  //   method: 'GET',
  //   url: 'http://localhost:3001/movies',
  //   headers: {
  //     headserver: process.env.KEYSECRET
  //   }
  // })
  //  .then(result => {
  //    moviedata = result.data

  //    // assuming data is not in cache, so we need to set it up
  //    client.set('moviedata', JSON.stringify(moviedata),'EX',10)

  //    res.status(200).json(moviedata)
  //  })
  //  .catch(error => {
  //   res.status(500).json({
  //     msg: 'ERROR Get movies list from Server 2',
  //     err: error
  //   })
  //  })
}

//---------------- get tv series data -----------
function gettvseriesdata(req,res) {
  let seriesdata = {}
  axios({
    method: 'GET',
    url: 'http://localhost:3002/tvseries',
    headers: {
      headserver: process.env.KEYSECRET
    }
  })
    .then(series => {
      seriesdata = series.data
      // console.log('no redis--------')
      
      // assuming data is not in cache, so we need to set it up
      client.set('seriesdata', JSON.stringify(seriesdata),'EX',10)

      res.status(200).json(seriesdata)
    })
    .catch(error => {
      res.status(500).json({
        msg: 'ERROR Get series list from Server 3',
        err: error
      })      
    })
}


//--------------- get all data --------
function getentertainmedata (req,res) {
  let moviedata = {}
  let seriesdata = {}
  
  // get movie data
  axios({
    method: 'GET',
    url: 'http://localhost:3001/movies',
    headers: {
      headserver: process.env.KEYSECRET
    }
  })
  .then(result => {
    moviedata = result.data

    // get series data
    axios({
        method: 'GET',
        url: 'http://localhost:3002/tvseries',
        headers: {
          headserver: process.env.KEYSECRET
        }
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
          msg: 'ERROR Get series list from Server 3',
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