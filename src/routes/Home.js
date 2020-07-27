import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Movie from "../components/Movie";

const GET_MOVIES = gql`
	{
		movies {
			id
			medium_cover_image
		}
	}
`;

const Container = styled.div`

`;

const Header = styled.div`

`;

const Title = styled.h1`

`;

const Subtitle = styled.h3`

`;

const Loading = styled.div`

`;

const Movies = styled.div``;

export default () => {
	const { loading, data } = useQuery(GET_MOVIES);
	return (
		<Container>
			<Header>
				<Title>Apollo 2020</Title>
				<Subtitle>I built GraphQL with Apollo</Subtitle>
			</Header>
			{loading && <Loading>Loading...</Loading>}
			{!loading && data.movies && (
				<Movies>
					{data.movies.map(m => (
						<Movie key={m.id} id={m.id} bg={m.medium_cover_image} />
					))}
				</Movies>
			)}
		</Container>
	);
};