import { FC, HTMLAttributes, ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'
import { Button } from 'ui/Buttons/Button'

interface PopupProps extends HTMLAttributes<HTMLDivElement> {
	closePopup: () => void
	children: ReactNode
}

const appear = keyframes`
    0%{
        opacity: 0;
        
    }
    100%{
        opacity: 1;
    }
`
const fromTop = keyframes`
0%{
	opacity: 0;
	transform: translateY(-50%);
	

}

100%{
	transform: translateY(0);
	opacity: 1;
	
}
`

const PopUpWrapper = styled.div`
	height: 100vh;
	width: 100%;
	position: fixed;
	top: 0;
	display: grid;
	place-items: center;
	animation: ${appear} 0.2s ease-in;
	background-color: rgba(0, 0, 0, 0.3);
`
const PopUpContent = styled.div`
	position: relative;
	background-color: #fff;
	padding: 40px;
	border-radius: 8px;
	animation: ${fromTop} 0.4s ease-in-out;

	> button {
		width: 80px;

		position: absolute;
		top: 20px;
		right: 20px;
	}
`

export const PopUp: FC<PopupProps> = ({ children, closePopup, ...rest }) => {
	return (
		<PopUpWrapper {...rest} onClick={closePopup}>
			<PopUpContent onClick={(e) => e.stopPropagation()}>
				<Button text={'close'} onClick={closePopup} />
				{children}
			</PopUpContent>
		</PopUpWrapper>
	)
}
