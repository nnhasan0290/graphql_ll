const { clients } = require("./sampledata.js");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = require("graphql");

const clientType = new GraphQLObjectType({
  name: "client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const RootSchema = new GraphQLObjectType({
  name: "rootQuery",
  description: "root query",
  fields: () => ({
    client: {
      type: clientType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return clients.find((client) => client.id === args.id);
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootSchema,
});
