import { gql, useQuery } from "@apollo/client";

const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
    }
  }
`;

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  console.log(loading, error, data);
  return (
    <div>
      <h2>Clients</h2>
    </div>
  );
};

export default Clients;
