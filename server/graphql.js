const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "query",
    description: "root query",
    fields: () => ({
      nothello: {
        type: GraphQLString,
        resolve: () => {
          return "Hello world";
        },
      },
    }),
  }),
});

module.exports = { schema };
