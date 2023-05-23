import { useSendMessageMutation } from 'entities/chat/api'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from 'ui/Buttons/Button'

const ProfileWrapper = styled.section`
	height: 100%;
	display: grid;
	grid-template-columns: 1fr;
	background-color: #8c8e9c;
`

export const Profile = () => {
	const location = useLocation()
	const [sendMessage, { data }] = useSendMessageMutation()

	const onClickSend = async () => {
		await sendMessage({
			chatId: '1',
			date: new Date(),
			email: 'smoe@mail.ru',
			text: 'connected',
		})
	}

	return (
		<ProfileWrapper>
			<Button text="Send Message" onClick={onClickSend} />
		</ProfileWrapper>
	)
}
