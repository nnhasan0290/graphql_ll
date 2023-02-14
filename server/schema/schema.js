const { clients, projects } = require("./sampledata.js");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
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
    clientId: {
      type: clientType,
      resolve: (parent, args) => {
        return Client.findById(parent.clientId);
      },
    },
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

const Mutation = new GraphQLObjectType({
  name: "mutation",
  fields: () => ({
    addClient: {
      type: clientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const client = new Client(args);
        return client.save();
      },
    },
    deleteClient: {
      type: clientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        return Client.findByIdAndDelete(args.id);
      },
    },
    addProject: {
      type: projectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        clientId: { type: new GraphQLNonNull(GraphQLID) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "status",
            values: {
              new: { value: "not started" },
              progress: { value: "in progress" },
              completed: { value: "completed" },
            },
          }),
          defaultValue: "not started",
        },
      },
      resolve: (parent, args) => {
        const project = new Project(args);
        return project.save();
      },
    },
    deleteProject: {
      type: projectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        return Project.findByIdAndDelete(args.id);
      },
    },
    updateProject: {
      type: projectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "statusUpdate",
            values: {
              new: { value: "not started" },
              progress: { value: "in progress" },
              completed: { value: "completed" },
            },
          }),
        },
      },
      resolve: (parent, args) => {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootSchema,
  mutation: Mutation,
});
