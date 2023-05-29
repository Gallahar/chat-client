import { Avatar } from 'entities/user/ui'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { getDate } from 'shared/lib/utils/getDate'
import { IChat } from 'shared/models/chat.interface'
import { useAppSelector } from 'store'
import { selectUser } from 'store/selectors'
import styled from 'styled-components'

const ChatCardWrapper = styled.div`
	padding: 15px;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.3);
	display: grid;
	grid-template-columns: repeat(2, max-content);
	align-items: center;
	gap: 30px;
`
const InfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
	> h1 {
	}

	> p {
	}
`

interface IChatCardProps {
	chat: IChat
}

export const ChatCard: FC<IChatCardProps> = ({ chat }) => {
	const currentUser = useAppSelector(selectUser)

	const { users, _id, updatedAt, messages } = chat
	const friend = users.find((user) => user.avatar !== currentUser.avatar)
	const lastMessage = messages[messages.length - 1]
	const lastMessageInfo = `${
		friend?._id !== lastMessage?.user ? 'You :' : ''
	} ${lastMessage?.text}`

	return (
		<Link to={_id}>
			<ChatCardWrapper>
				<Avatar width={120} height={120} src={friend?.avatar} />
				<InfoWrapper>
					<h1>{friend?.username}</h1>
					<p>{getDate(updatedAt)}</p>
					{lastMessage && (
						<p>
							{lastMessageInfo.length > 20
								? `${lastMessageInfo.slice(0, 40)}...`
								: lastMessageInfo}
						</p>
					)}
				</InfoWrapper>
			</ChatCardWrapper>
		</Link>
	)
}
