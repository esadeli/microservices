const gql = require('graphql')
const {GraphQLID, GraphQLString, GraphQLList, GraphQLObjectType} = gql

const movietype = new GraphQLObjectType({
  name: 'movieslist',
  fields: {
    _id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    overview: {
      type: GraphQLString
    },
    poster_path: {
      type: GraphQLString
    },
    status: {
      type: GraphQLString
    },
    tag: {
      type: new GraphQLList(GraphQLString)
    }
  }
})

module.exports = movietype