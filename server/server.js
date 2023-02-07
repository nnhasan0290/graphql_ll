const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const dotenv = require("dotenv");
const { buildSchema } = require("graphql");
const { schema } = require("./graphql");

const app = express();
dotenv.config({ path: "server/config/.env" });

app.use(
  "/graph",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log(`app is running on ${process.env.PORT}`);
});
