import { Middleware } from 'redux'
import { io, Socket } from 'socket.io-client'
import {
	startNewChat,
	receiveNewMessage,
	deleteChatById,
	deleteMessageById,
	chatConnect,
	receiveNewChat,
	sendNewMessage,
	receiveDeleteChatById,
	receiveDeleteMessageById,
} from 'store/slices/chatSlice'
import { ChatEvent, IChat, IDeleteChatDto } from 'shared/models/chat.interface'
import {
	IMessage,
	IDeleteMessageResponse,
	MessageEvent,
} from 'shared/models/message.interface'
import {  RootState } from 'store/types'

// eslint-disable-next-line @typescript-eslint/ban-types
const chatMiddleware: Middleware<{}, RootState> = (store) => {
	let socket: Socket

	return (next) => (action) => {
		if (chatConnect.match(action)) {
			socket = io(import.meta.env.VITE_PUBLIC_FILES_BASE_URL, {
				withCredentials: true,
			})

			socket.emit(ChatEvent.ChatConnect, action.payload)

			socket.on(ChatEvent.ChatReceiveNew, (chat: IChat) => {
				store.dispatch(receiveNewChat(chat))
			})

			socket.on(ChatEvent.ChatReceiveDelete, (chatId: IDeleteChatDto) => {
				store.dispatch(receiveDeleteChatById(chatId))
			})

			socket.on(MessageEvent.ReceiveNew, (message: IMessage) => {
				store.dispatch(receiveNewMessage(message))
			})

			socket.on(
				MessageEvent.ReceiveDelete,
				(data: IDeleteMessageResponse) => {
					store.dispatch(receiveDeleteMessageById(data))
				}
			)
		}

		if (startNewChat.match(action)) {
			socket.emit(ChatEvent.ChatStart, action.payload, (chat: IChat) => {
				store.dispatch(receiveNewChat(chat))
			})
		}

		if (deleteChatById.match(action)) {
			socket.emit(ChatEvent.ChatDelete, action.payload)
		}

		if (sendNewMessage.match(action)) {
			socket.emit(
				MessageEvent.SendMessage,
				action.payload,
				(message: IMessage) => {
					store.dispatch(receiveNewMessage(message))
				}
			)
		}

		if (deleteMessageById.match(action)) {
			socket.emit(MessageEvent.DeleteMessage, action.payload)
		}

		next(action)
	}
}

export default chatMiddleware
