import ApolloClient from "apollo-boost";

const client = new ApolloClient({
	uri: "http://localhost:7000/",
	resolvers: {
		Movie: {
			isLiked: () => false
		},
		Mutation: {
			likeMovie: (_, {id}, {cache}) => {
				console.log(id);
				console.log(cache);
				console.log(cache.writeData);
				cache.writeData({
					id: `Movie:${id}`,
					data: {
						isLiked: true,
						medium_cover_image: "null"
					}
				});
			}
		}
	}
});

export default client;