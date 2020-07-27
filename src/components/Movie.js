import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`

`;

const Poster = styled.div`

`;

export default ({id, bg}) => (
	<Container>
		<Link to={`/${id}`}>
			<Poster bg={bg} />
		</Link>
	</Container>
);