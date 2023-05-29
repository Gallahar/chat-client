import avatarImg from 'assets/userAvatar.png'
import styled from 'styled-components'
import { useGetUserByIdQuery } from '../api'
import { Avatar } from '../ui'
import { Button } from 'ui/Buttons/Button'
import { useStartChatMutation } from 'entities/chat/api'
import { useAppSelector } from 'store'
import { selectChats, selectUser } from 'store/selectors'
import { useIdLocation } from 'shared/hooks/useIdLocation'
import { useNavigate } from 'react-router-dom'

const ProfileWrapper = styled.section`
	height: 100%;
	display: grid;
	border-radius: 0 12px 12px 0;

	place-items: center;
	background-image: linear-gradient(to bottom, #6e288f, #896cad, #493d74);

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
	const user = useAppSelector(selectUser)
	const navigate = useNavigate()
	const lastChatId = useAppSelector(selectChats)
	const id = useIdLocation()
	const { data, isLoading } = useGetUserByIdQuery(id)
	const [startChat] = useStartChatMutation()

	const startChatEvent = async () => {
		await startChat({
			fromUserId: user._id,
			toUserId: id,
		})
		navigate(`/chats/${lastChatId[lastChatId.length - 1]._id}`)
	}

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
					<Button onClick={startChatEvent} text="start chat" />
				</>
			)}
		</ProfileWrapper>
	)
}
