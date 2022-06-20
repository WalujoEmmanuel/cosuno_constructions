import express from "express";
import { graphqlHTTP } from "express-graphql";
import { config } from "dotenv";
import cors from "cors";
import { schema, resolvers } from "./schema";

config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;
const GRAPHQL_PATH = process.env.GRAPHQL_PATH || "/graphql";

app.use(
  GRAPHQL_PATH,
  graphqlHTTP((request, response, graphQLParams) => ({
    schema,
    rootValue: resolvers,
    graphiql: true,
    context: {
      request,
      response,
    },
  }))
);

app.listen(PORT, () => {
  console.log(`API is running at http://localhost:${PORT}${GRAPHQL_PATH}`);
});
