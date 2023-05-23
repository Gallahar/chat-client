import { Outlet } from 'react-router-dom'
import { ChatWrapper } from './ChatContainer'
import { ChatContainer } from './ui'
import { UserBar } from 'entities/user/components/UserBar'

export const ChatLayout = () => {
	return (
		<ChatWrapper>
			<ChatContainer>
				<UserBar />
				<Outlet />
			</ChatContainer>
		</ChatWrapper>
	)
}
