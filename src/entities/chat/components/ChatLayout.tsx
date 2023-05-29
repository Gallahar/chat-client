import { Outlet } from 'react-router-dom'
import { LayoutWrapper } from './LayoutWrapper'
import { ChatContainer } from '../ui'
import { UserBar } from 'entities/user/components/UserBar'
import { useAppSelector } from 'store'
import { selectUser } from 'store/selectors'
import { useCreateConnectionQuery } from '../api'
import { useRefreshMutation } from 'entities/auth/api'
import { useEffect } from 'react'

export const ChatLayout = () => {
	const [refresh] = useRefreshMutation()
	const user = useAppSelector(selectUser)
	const { data } = useCreateConnectionQuery({ userId: user._id })

	useEffect(() => {
		refresh()
	}, [])

	return (
		<LayoutWrapper>
			<ChatContainer>
				<UserBar />
				<Outlet />
			</ChatContainer>
		</LayoutWrapper>
	)
}
