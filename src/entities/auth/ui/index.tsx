import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Heading = styled.h1({
	textAlign: 'center',
	fontWeight: '500',
	fontSize: '24px',
	margin: '30px 20px',
	color: '#664986',
})

export const CustomForm = styled.form`
	padding: 20px 60px;
	display: grid;
	grid-template-columns: 1fr;
	gap: 35px;
	@media (max-width: 429px) {
		padding: 20px 40px;
	}
`

export const StyledLink = styled(Link)`
	color: #664986;

	text-decoration: underline;
	transition: 0.3s ease-in-out;
	text-align: center;
	background-color: #f5f5f5;
	padding: 20px;
	border-top: 1px dashed lightgray;
	&:hover {
		color: inherit;
		background-color: #f4f8e4;
	}
`

export const Container = styled.div({
	height: '100vh',
	width: '100vw',
	display: 'grid',
	placeItems: 'center',
	backgroundColor: '#534292',
	backgroundImage: 'linear-gradient(to bottom,#654a86,#534292)',
})

export const FormWrapper = styled.div`
	display: grid;

	grid-template-columns: minmax(max-content, 1fr);
	border-radius: 8px;
	background-color: white;
	color: #2d3748;
	box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2);
	min-width: 430px;
	@media (max-width: 429px) {
		min-width: 340px;
	}

	margin: 0 auto;
`
