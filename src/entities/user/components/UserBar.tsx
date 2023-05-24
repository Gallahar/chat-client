import { Button } from 'ui/Buttons/Button'
import {
	SideBar,
	ActionMenu,
	Avatar,
	AvatarWrapper,
	ChangeAvatarContainer,
} from '../ui'
import avatarImg from 'assets/userAvatar.png'
import { logout } from 'store/slices/userSlice'
import { useAppDispatch, useAppSelector } from 'store'
import { SearchSection } from './SearchSection'
import { selectUser } from 'store/selectors'
import { useEffect, useState } from 'react'
import { Setting } from 'ui/icons/Settings'
import { createPortal } from 'react-dom'
import { PopUp } from 'ui/PopUp/PopUp'
import { FileField } from 'entities/file/components/FileField'
import { useUpdateAvatarMutation } from '../api'
import { toast } from 'react-toastify'

export const UserBar = () => {
	const [updateAvatar, { isSuccess }] = useUpdateAvatarMutation()
	const [path, setPath] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const user = useAppSelector(selectUser)
	const dispatch = useAppDispatch()

	const closePopUpHandler = () => {
		setPath('')
		setIsOpen(false)
	}

	const handleSave = () => {
		if (!path) return
		updateAvatar({ avatar: path })
	}

	useEffect(() => {
		if (isSuccess) {
			toast.success('Avatar saved successfully')
		}
	}, [isSuccess])

	return (
		<SideBar>
			<ActionMenu>
				<Setting onClick={() => setIsOpen(true)} />
				<h1>{user?.username}</h1>
				<AvatarWrapper>
					<Avatar
						width={50}
						height={50}
						src={user?.avatar || avatarImg}
					/>
				</AvatarWrapper>
				<Button onClick={() => dispatch(logout())} text={'logout'} />
			</ActionMenu>
			<SearchSection />
			{isOpen &&
				createPortal(
					<PopUp closePopup={closePopUpHandler}>
						<ChangeAvatarContainer>
							<h2>Change avatar</h2>
							<FileField
								setPath={setPath}
								path={path}
								folder="avatar"
								placeholder="upload avatar"
							/>
							<Button onClick={handleSave} text="save" />
						</ChangeAvatarContainer>
					</PopUp>,
					document.body
				)}
		</SideBar>
	)
}
