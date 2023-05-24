import { FC, ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'
import { Button } from 'ui/Buttons/Button'

interface PopupProps {
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

	> button {
		width: 80px;

		position: absolute;
		top: 20px;
		right: 20px;
	}
`

export const PopUp: FC<PopupProps> = ({ children, closePopup }) => {
	return (
		<PopUpWrapper onClick={closePopup}>
			<PopUpContent onClick={(e) => e.stopPropagation()}>
				<Button text={'close'} onClick={closePopup} />
				{children}
			</PopUpContent>
		</PopUpWrapper>
	)
}
