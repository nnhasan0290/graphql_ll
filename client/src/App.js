import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import Clients from "./Clients/Clients";

const client = new ApolloClient({
  uri: "https://3001-work0290-graphql-bk474wyewgi.ws-us87.gitpod.io/graph",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Clients />
    </ApolloProvider>
  );
};

export default App;
