import { FC } from 'react'
import { IMessage } from 'shared/models/message.interface'
import { IUser } from 'shared/models/user.interface'
import { useAppSelector } from 'store'
import { selectUser } from 'store/selectors'
import styled from 'styled-components'

interface IMessageCardProps {
	message: IMessage
	users: IUser[]
}

const MessageCardWrapper = styled.div<{ friend: boolean }>`
	background-color: ${(props) => (props.friend ? '#7338aa' : '#2f3248')};
	justify-self: ${(props) => (props.friend ? 'end' : 'start')};
	overflow-wrap: break-word;
	color: #fff;
	width: 400px;
	border-radius: 8px;
	padding: 20px;
`

export const MessageCard: FC<IMessageCardProps> = ({ message,users }) => {
	const currentUserId = useAppSelector(selectUser)._id
	const { text, user } = message

	return (
		<MessageCardWrapper friend={currentUserId === user}>
			{text}
		</MessageCardWrapper>
	)
}
