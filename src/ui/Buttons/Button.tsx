import { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string
}

export const CustomButton = styled.button({
	padding: '10px',
	width: '100%',
	border: 'none',
	borderRadius: '8px',
	backgroundColor: '#60467e',
	backgroundImage:
		'linear-gradient( to left bottom,rgba(159,88,150,0) 0,rgba(159,88,150,0.6) 100%)',
	fontWeight: 500,
	fontSize: '1.2em',
	boxShadow: '0 0 1px 1px rgba(0,0,0,0.1)',
	color: '#fff',
	transition: '0.1s ease-in',
	'&:hover': {
		backgroundColor: '#8162a5',
		backgroundImage:
			'linear-gradient( to right bottom,rgba(159,88,150,0) 0,rgba(159,88,150,0.6) 100%)',
		cursor: 'pointer',
	},
	'&focus-visible': {
		outline: '1px dashed lightblue',
	},
})

export const Button = ({ text, ...rest }: IButtonProps) => {
	return <CustomButton {...rest}>{text}</CustomButton>
}
