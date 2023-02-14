const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema.js");
const cors = require("cors");

const dotenv = require("dotenv");
const connectDatabase = require("./config/db.js");

const app = express();
dotenv.config({ path: "server/config/.env" });

app.use(cors());

connectDatabase()
app.use(
  "/graph",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log(`app is running on ${process.env.PORT}`);
});
