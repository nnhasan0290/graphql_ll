const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const dotenv = require("dotenv");
const { buildSchema } = require("graphql");

const app = express();
dotenv.config({ path: "server/config/.env" });

app.use(
  "/graph",
  graphqlHTTP({
    schema: buildSchema(`
    type Query{
        hello: String
    }
    `),
    rootValue: {
      hello: () => "Hello world",
    },
    graphiql: true
  })
);

app.listen(process.env.PORT, () => {
  console.log(`app is running on ${process.env.PORT}`);
});
