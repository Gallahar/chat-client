import { Outlet } from 'react-router-dom'
import { LayoutWrapper } from './LayoutWrapper'
import { ChatContainer } from '../ui'
import { UserBar } from 'entities/user/components/UserBar'
import { useAppDispatch, useAppSelector } from 'store'
import { selectUser } from 'store/selectors'
import { useRefreshMutation } from 'entities/auth/api'
import { useEffect } from 'react'
import { chatConnect } from 'store/slices/chatSlice'

export const ChatLayout = () => {
	const dispatch = useAppDispatch()
	const [refresh] = useRefreshMutation()
	const user = useAppSelector(selectUser)

	useEffect(() => {
		refresh()
		dispatch(chatConnect({ userId: user._id }))
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
