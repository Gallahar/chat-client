import { ChatCard } from 'entities/chat/components/ChatCard'
import { ChatContentWrapper } from 'entities/chat/ui'
import { useAppSelector } from 'store'
import { selectChats } from 'store/selectors'
import styled from 'styled-components'

const ChatsWrapper = styled(ChatContentWrapper)`
	overflow-y: auto;
	max-height: 800px;
	padding: 20px;
	display: grid;
	grid-template-columns: 1fr;
	grid-auto-rows: 200px;
	gap: 20px;
`

export const Chats = () => {
	const chats = useAppSelector(selectChats)

	return (
		<ChatsWrapper>
			{chats.map((chat) => (
				<ChatCard key={chat._id} chat={chat} />
			))}
		</ChatsWrapper>
	)
}
