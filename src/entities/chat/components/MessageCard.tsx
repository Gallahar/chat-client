import { FC, memo } from 'react'
import { IMessage } from 'shared/models/message.interface'
import { IUser } from 'shared/models/user.interface'
import { useAppDispatch, useAppSelector } from 'store'
import { selectUser } from 'store/selectors'
import styled from 'styled-components'
import { Close } from 'ui/icons/Close'
import { CloseButton } from './ChatCard'
import { deleteMessageById } from 'store/slices/chatSlice'

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
	position: relative;
`

export const MessageCard: FC<IMessageCardProps> = memo(({ message, users }) => {
	const dispatch = useAppDispatch()
	const currentUserId = useAppSelector(selectUser)._id
	const { text, user, _id } = message

	const handleDelete = () => {
		dispatch(deleteMessageById({ messageId: _id }))
	}

	return (
		<MessageCardWrapper friend={currentUserId !== user}>
			{text}
			<CloseButton position onClick={handleDelete}>
				<Close fill="#fff" width={30} height={30} />
			</CloseButton>
		</MessageCardWrapper>
	)
})
