import { FC } from 'react'
import { IUser } from 'shared/models/user.interface'
import styled from 'styled-components'
import { Avatar } from '../ui'
import avatarImg from 'assets/userAvatar.png'
import { Link } from 'react-router-dom'

interface UserCardProps {
	user: IUser
}

const CardWrapper = styled.div`
	padding: 5px;
	width: 100%;
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 0 0 1px 2px rgba(0, 0, 0, 0.2);
	display: grid;
	place-items: center;
	gap: 10px;
	grid-template-columns: max-content max-content;
`
const CardInfo = styled.div`
	display: grid;
	grid-auto-rows: max-content;
	gap: 5px;
`

export const UserCard: FC<UserCardProps> = ({ user }) => {
	const { _id, username, email, avatar } = user

	return (
		<CardWrapper>
			<Link to={`profile/${_id}`}>
				<Avatar
					src={avatar ? avatar : avatarImg}
					width={70}
					height={70}
				/>
			</Link>
			<CardInfo>
				<p>{username}</p>
				<p>{email}</p>
			</CardInfo>
		</CardWrapper>
	)
}
