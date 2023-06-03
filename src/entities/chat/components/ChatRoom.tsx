import styled from 'styled-components'
import { ChatContentWrapper } from '../ui'
import { useAppDispatch, useAppSelector } from 'store'
import { selectCurrentChat, selectUser } from 'store/selectors'
import { useIdLocation } from 'shared/hooks/useIdLocation'
import { MessageCard } from './MessageCard'
import { Button } from 'ui/Buttons/Button'
import { useState } from 'react'
import { IMessage } from 'shared/models/message.interface'
import { sendNewMessage } from 'store/slices/chatSlice'

const ChatRoomBody = styled(ChatContentWrapper)`
	display: grid;
	grid-template-rows: 10% 70% 20%;
	max-height: 800px;
`

const ChatRoomHeader = styled.nav`
	background-color: rgb(30, 55, 72);
	border-radius: 0 12px 0 0;
	padding: 20px;
	display: grid;
	align-items: center;
	> ul {
		list-style: none;
		display: flex;
		justify-content: space-between;
		color: lightgray;
	}
`

const ChatRoomMessages = styled.div`
	padding: 10px;
	overflow: auto;
	display: grid;
	grid-auto-rows: max-content;
	gap: 20px;
`

const ChatRoomInputSection = styled.div`
	padding: 10px;
	display: grid;
	grid-template-columns: 80% auto;
	gap: 20px;
	> textarea {
		border-radius: 8px;
		resize: none;
		padding: 10px;
	}
`

export const ChatRoom = () => {
	const dispatch = useAppDispatch()
	const user = useAppSelector(selectUser)
	const chatId = useIdLocation()
	const chat = useAppSelector((state) => selectCurrentChat(state, chatId))
	const [message, setMessage] = useState('')

	const onClickSandMessage = () => {
		if (!message) return
		dispatch(
			sendNewMessage({
				chatId,
				user: user._id,
				text: message,
			})
		)
		setMessage('')
	}

	return (
		<ChatRoomBody>
			<ChatRoomHeader>
				<ul>
					<li>Some Action Button</li>
					<li>Some Action Button</li>
					<li>Some Action Button</li>
				</ul>
			</ChatRoomHeader>
			<ChatRoomMessages>
				{chat?.messages.map((message: IMessage) => (
					<MessageCard
						key={message._id}
						users={chat.users}
						message={message}
					/>
				))}
			</ChatRoomMessages>
			<ChatRoomInputSection>
				<textarea
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<Button text="send message" onClick={onClickSandMessage} />
			</ChatRoomInputSection>
		</ChatRoomBody>
	)
}
