import styled from 'styled-components'

export const SideBar = styled.aside`
	padding-right: 5px;
	background-color: #2d3748;
	display: grid;
	grid-template-rows: max-content 1fr;
	gap: 10px;
`

export const ActionMenu = styled.div`
	padding: 20px;
	width: 100%;
	height: 100%;
	display: grid;
	place-items: center;
	grid-template-columns: 1fr 1fr auto;
	> h1 {
		color: #fff;
	}
`

export const Avatar = styled.img`
	border-radius: 50%;
	border: 1px solid #2f3248;
`

export const AvatarWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`


