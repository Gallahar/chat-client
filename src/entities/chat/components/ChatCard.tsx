import { Avatar } from 'entities/user/ui'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { getDate } from 'shared/lib/utils/getDate'
import { IChat } from 'shared/models/chat.interface'
import { useAppDispatch, useAppSelector } from 'store'
import { selectUser } from 'store/selectors'
import { deleteChatById } from 'store/slices/chatSlice'
import styled from 'styled-components'
import { Close } from 'ui/icons/Close'

export const CloseButton = styled.button<{ position?: boolean }>`
	background: inherit;
	width: 30px;
	height: 30px;
	top: ${(props) => (props.position ? '5px' : '20px')};
	right: ${(props) => (props.position ? '5px' : '20px')};
	position: absolute;
	padding: 0;
	outline: none;
	border: none;
	> svg {
		cursor: pointer;
	}
`

const ChatCardWrapper = styled.div`
	padding: 15px;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.3);
	position: relative;
	display: grid;
	align-items: center;

	> a {
		display: grid;
		grid-template-columns: repeat(2, max-content);
		align-items: center;
		gap: 30px;
	}
`
const InfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;

	> h1 {
	}

	> p {
		max-width: 500px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
`

interface IChatCardProps {
	chat: IChat
}

export const ChatCard: FC<IChatCardProps> = ({ chat }) => {
	const currentUser = useAppSelector(selectUser)
	const dispatch = useAppDispatch()
	const { users, _id, updatedAt, messages } = chat
	const friend = users.find((user) => user.avatar !== currentUser.avatar)
	const lastMessage = messages[messages.length - 1]
	const lastMessageText = `${
		friend?._id !== lastMessage?.user ? 'You:' : ''
	} ${lastMessage?.text}`

	

	const handleDelete =  () => {
		if (window.confirm('do you really want delete this chat?')) {
			dispatch(deleteChatById({ chatId: _id }))
		}
	}

	return (
		<ChatCardWrapper>
			<Link to={_id}>
				<Avatar width={120} height={120} src={friend?.avatar} />
				<InfoWrapper>
					<h1>{friend?.username}</h1>
					<p>{getDate(updatedAt)}</p>
					{lastMessage && <p>{lastMessageText}</p>}
				</InfoWrapper>
			</Link>
			<CloseButton onClick={handleDelete}>
				<Close width={30} height={30} />
			</CloseButton>
		</ChatCardWrapper>
	)
}
