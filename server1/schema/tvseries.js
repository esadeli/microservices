const gql = require('graphql')
const {GraphQLID, GraphQLString, GraphQLList, GraphQLObjectType} = gql

const tvseriestype = new GraphQLObjectType({
  name: 'tvserieslist',
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

module.exports = tvseriestype