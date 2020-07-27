import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

const GET_MOVIE = gql`
	query getMovie($id: Int!) {
		movie(id: $id) {
			title
			medium_cover_image
			language
			rating
			description_intro
		}
	}
`;

const Container = styled.div``;

const Column = styled.div``;

const Title = styled.h1``;

const Subtitle = styled.h4``;

const Description = styled.p``;

const Poster = styled.div``;

export default () => {
	const { id } = useParams();
	const { loading, data } = useQuery(GET_MOVIE, {
		variables: {id: parseInt(id)}
	});
	if (loading) {
		return "Loading...";
	}
	if (data && data.movie) {
		return (
			<Container>
				<Column>
					<Title>Name</Title>
					<Subtitle></Subtitle>
					<Description></Description>
				</Column>
				<Poster></Poster>
			</Container>
		);
	}
};