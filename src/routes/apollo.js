import ApolloClient from "apollo-boost";

const client = new ApolloClient({
	uri: "https://wrappingrestql.herokuapp.com/",
	resolvers: {
		Movie: {
			isLiked: () => false
		},
		Mutation: {
			toggleLikeMovie: (_, {id, isLiked}, {cache}) => {
				console.log(id);
				console.log(cache);
				console.log(cache.writeData);
				cache.writeData({
					id: `Movie:${id}`,
					data: {
						isLiked: !isLiked
					}
				});
			}
		}
	}
});

export default client;