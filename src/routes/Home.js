import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled, { keyframes } from "styled-components";
import Movie from "../components/Movie";
import { device } from "../assets/device";

const GET_MOVIES = gql`
	{
		movies {
			id
			title
			medium_cover_image
			isLiked @client
		}
	}
`;

const Container = styled.div`
	display: flex;
  flex-direction: column;
  align-items: center;
	width: 100%;
`;

const Header = styled.div`
	background-color: #8EC5FC;
	background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
	height: 420px;
	color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

const Title = styled.h1`
	font-size: 60px;
	font-weight: 600;
	margin-bottom: 20px;
	@media ${device.mobileS} {
		font-size: 40px;
	}
`;

const Subtitle = styled.h3``;

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

const Movies = styled.ul`
	display:flex;
	flex-wrap: wrap;
	justify-content: center;
	align-content: center;
	width: 100%;
	max-width: 1120px;
	height: 100%;
	margin: 0 auto;
	position: relative;
	top: -70px;
	text-align: left;
	@media ${device.tablet} {
		top: -75px;
  }
`;

export default () => {
	const { loading, data } = useQuery(GET_MOVIES);
	return (
		<Container>
			<Header>
				<Title>Apollo 2020</Title>
				<Subtitle>I built GraphQL with Apollo</Subtitle>
			</Header>
			{loading && <Loading />}
			{!loading && data.movies && (
				<Movies>
					{data.movies.map(m => (
						<Movie key={m.id} id={m.id} isLiked={m.isLiked} bg={m.medium_cover_image} title={m.title} />
					))}
				</Movies>
			)}
		</Container>
	);
};