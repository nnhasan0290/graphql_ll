const { clients, projects } = require("./sampledata.js");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require("graphql");
const Project = require("../models/project.js");
const Client = require("../models/client.js");

const clientType = new GraphQLObjectType({
  name: "client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});
const projectType = new GraphQLObjectType({
  name: "project",
  fields: () => ({
    id: { type: GraphQLID },
    description: { type: GraphQLString },
    name: { type: GraphQLString },
    clientId: { type: GraphQLID },
    status: { type: GraphQLString },
  }),
});

const RootSchema = new GraphQLObjectType({
  name: "rootQuery",
  description: "root query",
  fields: () => ({
    projects: {
      type: new GraphQLList(projectType),
      resolve: () => Project.find(),
    },
    clients: {
      type: new GraphQLList(clientType),
      resolve: () => Client.find(),
    },
    client: {
      type: clientType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return clients.find((client) => client.id === args.id);
      },
    },
    project: {
      type: projectType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) =>
        projects.find((project) => project.id === args.id),
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootSchema,
});
