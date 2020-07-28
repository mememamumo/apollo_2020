import React from "react";
import { useParams, Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled, { keyframes } from "styled-components";
import Movie from "../components/Movie";
import { device } from "../assets/device";

const GET_MOVIE = gql`
	query getMovie($id: Int!) {
		movie(id: $id) {
			title
			medium_cover_image
			language
			rating
			description_intro
		}
		suggestions(id: $id) {
			id
			title
			medium_cover_image
		}
	}
`;

const Container = styled.div`
	background-color: #8EC5FC;
	background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	color: white;
	flex: 1 1 auto;
	overflow-y: auto;
	padding: 50px 0;
	@media ${device.tablet} {
    padding: 50px 0 0;
  }
`;

const Wrapper = styled.div`
	width: 100%;
	max-width: 1120px;
	height: 100%;
	padding: 50px 0 30px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	@media ${device.tablet} {
    flex-direction: column;
  }
`;

const Column = styled.div`
	width: 50%;
	padding-right: 20px;
	margin-left: 16px;
	@media ${device.tablet} {
		width: 90%;
    margin: 0 16px;
  }
`;

const Title = styled.h1`
	font-size: 60px;
	font-weight: 600;
  margin-bottom: 35px;
`;

const Subtitle = styled.h4`
	font-size: 20px;
	margin-bottom: 10px;
`;

const Description = styled.p`
	font-size: 16px;
	line-height: 1.3;
`;

const Poster = styled.div`
	width: 100%;
	max-width: 500px;
	height: 750px;
	background-color: transparent;
	background-image: url(${props => props.bg});
	background-size: 100%;
	background-position: center center;
	background-repeat: no-repeat;
	margin-right: 16px;
	@media ${device.tablet} {
		height: 600px;
		margin-top: 20px;
		margin-right: 0;
  }
`;

const Movies = styled.ul`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-content: center;
	width: 100%;
	max-width: 1120px;
	height: auto;
	margin: 30px 0 50px;
	padding-top: 30px;
	position: relative;
	border-top: 1px solid #ddd;
	@media ${device.mobileL} {
		padding-top: 20px;
		justify-content: center;
  }
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
		background: #E0C3FC;
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

const Home = styled(Link)`
	width: 100%;
	color: white;
	font-weight: 500;
	font-size: 24px;
	justify-content: flex-start;
	margin-left: 20px;
	&::before {
		content: "< ";
		color: white;
		font-size: 28px;
	}
`;

export default () => {
	const { id } = useParams();
	const { loading, data } = useQuery(GET_MOVIE, {
		variables: {id: parseInt(id)}
	});
	return (
		<Container>
			{loading && <Loading />}
			{!loading && data.movie && (
				<>
					<Home to="/">Apollo 2020</Home>
					<Wrapper>
						<Column>
							<Title>{data?.movie?.title}</Title>
							<Subtitle>{data?.movie?.language}</Subtitle>
							<Subtitle>{data?.movie?.rating}</Subtitle>
							<Description>{data?.movie?.description_intro}</Description>
						</Column>
						<Poster bg={data?.movie?.medium_cover_image}></Poster>
					</Wrapper>
					<Movies>
						{data && data.suggestions && data.suggestions.map(s => <Movie key={s.id} id={s.id} title={s.title} bg={s.medium_cover_image} />)}
					</Movies>
				</>
			)}
		</Container>
	);
};