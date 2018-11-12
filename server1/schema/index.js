'use strict'

const {GraphQLSchema, GraphQLObjectType, GraphQLList } = require('graphql')
const movietype= require('./movie')
const tvseriestype = require('./tvseries')

const {getmovie, gettvseries} = require('../controllers/EntertainmeController')

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Querydata',
    fields: {
      movies: {
        type: new GraphQLList(movietype), 
        resolve: async () => {
          let movieslist = await getmovie()
          // console.log('data---', movieslist.data)
          return movieslist.data
        }
      },
      tvseries: {
        type: new GraphQLList(tvseriestype),
        resolve: async () => {
          let tvserieslist = await gettvseries()
          return tvserieslist.data
        }
      }
    }
  })
})

module.exports = schema