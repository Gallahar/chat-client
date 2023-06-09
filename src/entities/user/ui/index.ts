import styled, { keyframes } from 'styled-components'

export const SideBar = styled.aside`
	padding-right: 5px;
	background-color: #2d3748;
	display: grid;
	grid-template-rows: max-content 1fr;
	gap: 10px;
	overflow: auto;
`

const rotate = keyframes`
    0%{
		transform: rotate(0)
	}

	50%{
		transform: rotate(90deg)
	}

    100%{
        transform: rotate(180deg)
    }
`

export const ActionMenu = styled.div`
	padding: 20px 10px;
	width: 100%;
	height: 100%;
	display: grid;
	justify-content: space-between;
	align-items: center;
	grid-template-columns: repeat(5,max-content);
	> h1 {
		color: #fff;
	}
	> svg {
		cursor: pointer;

		&:hover {
			animation: ${rotate} 1s linear infinite;
		}
	}
`

export const Avatar = styled.img`
	border-radius: 50%;
	border: 1px solid #2f3248;
`

export const ChangeAvatarContainer = styled.div`
	width: 500px;
	height: 500px;
	display: grid;
	align-content: space-between;
`
