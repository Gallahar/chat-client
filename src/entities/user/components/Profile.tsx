import { useLocation } from 'react-router-dom'
import avatarImg from 'assets/userAvatar.png'
import styled from 'styled-components'
import { useGetUserByIdQuery } from '../api'
import { Avatar } from '../ui'
import { Button } from 'ui/Buttons/Button'

const ProfileWrapper = styled.section`
	height: 100%;
	display: grid;

	place-items: center;
	background-image: linear-gradient(to left, #896cad, #493d74);

	> button {
		width: 50%;
	}
`
const DataContainer = styled.div`
	color: #ccc6c6;
	display: grid;
	gap: 20px;
	justify-items: center;
`

export const Profile = () => {
	const location = useLocation()
	const { data, isLoading } = useGetUserByIdQuery(
		location.pathname.split('/')[2]
	)

	return (
		<ProfileWrapper>
			{data && (
				<>
					<DataContainer>
						<Avatar
							width={200}
							height={200}
							src={data.avatar || avatarImg}
						/>
						<h1>{data.username}</h1>
						<h2>{data.email}</h2>
					</DataContainer>
					<Button text="send message" />
				</>
			)}
		</ProfileWrapper>
	)
}
