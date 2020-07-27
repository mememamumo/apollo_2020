import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Poster = styled.div`
	position: relative;
	padding: 0;
	margin: 16px;
	width: 192px;
	height: 280px;
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
`;

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	&:nth-child(5n+1) ${Poster} {
		width: 416px;
	}
	&:nth-child(5n+1) ${Title} {
		font-size: 2em;
	}
`;

export default ({id, bg, title}) => (
	<Container>
		<Link to={`/${id}`}>
			<Poster bg={bg}>
			<Title>Title</Title>
			</Poster>
		</Link>
	</Container>
);