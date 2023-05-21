import { FC, InputHTMLAttributes, Ref, forwardRef } from 'react'
import styled from 'styled-components'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	ref?: Ref<HTMLInputElement>
	error?: string
	label?: string
}

const InputContainer = styled.div({
	width: '100%',
	position: 'relative',
})

const InputLabel = styled.label({
	display: 'grid',
	gridTemplateColumns: '1fr',
	gap: '10px',
	fontSize: '12px',
	alignItems: 'center',
	width: '100%',
})

const StyledInput = styled.input({
	lineHeight: '150%',
	width: '100%',
	padding: '5px',
	boxShadow: 'inset 0 0 0.5px 1px rgba(0,0,0,0.4)',
	border: 'none',
	borderRadius: '4px',
	'&:focus': {
		outline: '1px solid #8458B3',
		boxShadow: 'inset 0 0 0.5px 0.5px #8458B3',
	},
})

const ErrorMessage = styled.p`
	color: red;
	bottom: -20px;
	position: absolute;
	font-size: 12px;
`

export const Input: FC<InputProps> = forwardRef(
	({ error, label, ...rest }, ref) => {
		return (
			<InputContainer>
				<InputLabel>
					{label}
					<StyledInput ref={ref} {...rest} />
				</InputLabel>
				{error && <ErrorMessage>{error}</ErrorMessage>}
			</InputContainer>
		)
	}
)

Input.displayName = 'Input'
