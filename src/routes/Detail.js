import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled, { keyframes } from "styled-components";

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

const Container = styled.div`
	background-color: #8EC5FC;
	background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	color: white;
`;

const Column = styled.div`
	margin-left: 10px;
`;

const Title = styled.h1`
	font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
	font-size: 35px;
	margin-bottom: 10px;
`;

const Description = styled.p`
	font-size: 28px;
`;

const Poster = styled.div`
	width: 25%;
	height: 60%;
	background-color: transparent;
`;

const load3 = keyframes`
	100% {
		transform: rotate(360deg);
	}
`;

const Loading = styled.div`
	animation: ${load3} 1s infinite linear;
  background: #334;
  background: linear-gradient(to right, #8EC5FC 10%, rgba(221, 221, 221, 0) 70%);
  border-radius: 50%;
  height: 50px;
  margin: 5em auto;
  position: relative;
	width: 50px;
	&::before {
		width: 100%;
		height: 50%;
		background: #8EC5FC;
		border-radius: 50px 50px 0 0;
		position: absolute;
		top: 0;
		left: 0;
		content: '';
	}
	&::after {
		background: #334;
		width: 60%;
		height: 60%;
		border-radius: 50%;
		content: '';
		margin: auto;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
`;

export default () => {
	const { id } = useParams();
	const { loading, data } = useQuery(GET_MOVIE, {
		variables: {id: parseInt(id)}
	});
	if (loading) {
		return <Loading />;
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