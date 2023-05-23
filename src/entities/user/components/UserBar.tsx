import { Button } from 'ui/Buttons/Button'
import { SideBar, ActionMenu, Avatar, AvatarWrapper } from '../ui'

import avatarImg from 'assets/userAvatar.png'
import { logout } from 'store/slices/userSlice'
import { useAppDispatch, useAppSelector } from 'store'
import { SearchSection } from './SearchSection'
import { selectUser } from 'store/selectors'

export const UserBar = () => {
	const user = useAppSelector(selectUser)
	const dispatch = useAppDispatch()

	return (
		<SideBar>
			<ActionMenu>
				<h1>{user?.username}</h1>
				<AvatarWrapper>
					<Avatar width={50} height={50} src={avatarImg} />
					<p>change avatar</p>
				</AvatarWrapper>
				<Button onClick={() => dispatch(logout())} text={'logout'} />
			</ActionMenu>
			<SearchSection />
		</SideBar>
	)
}
