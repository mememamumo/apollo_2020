import ApolloClient from "apollo-boost";

const client = new ApolloClient({
	uri: "http://localhost:7000/"
});

export default client;