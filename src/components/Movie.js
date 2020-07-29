import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../assets/device";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const LIKE_MOVIE = gql`
	mutation likeMovie($id: Int!) {
		likeMovie(id: $id) @client
	}
`;

const Poster = styled.div`
	position: relative;
	padding: 0;
	display: block;
	width: 100%;
	min-width: 192px;
	height: 280px;
	object-fit: cover;
	border-radius: 4px;
	box-shadow: 0 8px 16px #1126;
	background: #111;
	background-image: url(${props => props.bg});
	background-size: 100%;
	overflow: hidden;
	&::after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom, transparent 10%, #113d 90%);
	}
	@media ${device.mobileL} {
		width: 100%;
		min-width: 414px;
		height: 280px;
		margin: 14px auto;
		border-radius: 0;
	}
	@media ${device.mobileM} {
		min-width: 375px;
	}
	@media ${device.mobileS} {
		min-width: 320px;
		height: 220px;
  }
`;

const Title = styled.h2`
	display: block;
	position: absolute;
	bottom: 24px;
	left: 24px;
	right: 30%;
	margin: 0;
	padding: 0;
	color: #ddf;
	font-size: 16px;
	line-height: 1.35;
	z-index: 5;
	font-weight: bold;
	text-shadow: 0 0 4px #111;
	@media ${device.mobileL} {
		font-size: 2em;
	}
	@media ${device.mobileM} {
		font-size: 1.4em;
  }
`;

const Container = styled.li`
	display: grid;
	margin: 14px;
	align-items: start;
	transition: .2s;
	&:nth-child(5n+1) ${Poster} {
		width: 416px;
	}
	&:nth-child(5n+1) ${Title} {
		font-size: 2em;
	}
	&:hover {
		transform: translateY(-1%);
		box-shadow: 0 4rem 8rem rgba(0, 0, 0, .3);
	}
	@media ${device.mobileL} {
		margin: 0;
	}
	@media ${device.mobileM} {
		&:nth-child(5n+1) ${Poster} {
			width: 375px;
		}
		&:nth-child(5n+1) ${Title} {
			font-size: 1.4em;
		}
	}
	@media ${device.mobileS} {
		&:nth-child(5n+1) ${Poster} {
			width: 320px;
		}
		&:nth-child(5n+1) ${Title} {
			font-size: 1.4em;
		}
  }
`;

export default ({id, bg, title, isLiked}) => {
	const [likeMovie] = useMutation(LIKE_MOVIE, { variables: {id: parseInt(id)}});
	return (
		<Container>
			<Link to={`/${id}`}>
				<Poster bg={bg}>
				<Title>{title}</Title>
				</Poster>
			</Link>
			<button onClick={isLiked? null: likeMovie}>{isLiked ? "Unlike" : "Like"}</button>
		</Container>		
	);
};