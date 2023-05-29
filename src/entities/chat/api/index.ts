import { createApi } from '@reduxjs/toolkit/query/react'
import { IChat, IConnection, StartChat } from 'shared/models/chat.interface'
import { Socket, io } from 'socket.io-client'
import { ChatEvent } from 'shared/models/chat.interface'
import axiosBaseQuery from 'api/axiosBaseQuery'
import {
	ICreateMessage,
	IMessage,
	MessageEvent,
} from 'shared/models/message.interface'
import { addNewChat, addNewMessage } from 'store/slices/chatSlice'
let socket: Socket
export function getSocket() {
	if (!socket) {
		socket = io('http://localhost:5000', {
			withCredentials: true,
		})
	}
	return socket
}

export const chatApi = createApi({
	reducerPath: 'chatApi',
	baseQuery: axiosBaseQuery(),
	endpoints: (builder) => ({
		sendMessage: builder.mutation<void, ICreateMessage>({
			query: () => ({ data: [] }),
			async onCacheEntryAdded(message, { dispatch }) {
				try {
					const socket = getSocket()
					socket.emit(
						MessageEvent.SendMessage,
						message,
						(message: IMessage) => {
							dispatch(addNewMessage(message))
						}
					)
				} catch (error) {
					console.log(error)
				}
			},
		}),
		createConnection: builder.query<void, IConnection>({
			query: () => ({ data: [] }),
			async onCacheEntryAdded(id, { cacheEntryRemoved, dispatch }) {
				try {
					const socket = getSocket()
					socket.emit(ChatEvent.ChatConnect, id, () => {
						console.log('connected')
					})
					socket.on(ChatEvent.ChatReceiveNew, (chat: IChat) => {
						dispatch(addNewChat(chat))
					})
					socket.on(MessageEvent.ReceiveNew, (message: IMessage) => {
						dispatch(addNewMessage(message))
					})

					await cacheEntryRemoved

					socket.off(ChatEvent.ChatReceiveNew)
					socket.off(MessageEvent.ReceiveNew)
				} catch (error) {
					console.log(error)
				}
			},
		}),
		startChat: builder.mutation<void, StartChat>({
			query: () => ({ data: [] }),
			async onCacheEntryAdded(startChatDto, { dispatch }) {
				try {
					const socket = getSocket()
					socket.emit(
						ChatEvent.ChatStart,
						startChatDto,
						(chat: IChat) => {
							dispatch(addNewChat(chat))
						}
					)
				} catch (error) {
					console.log(error)
				}
			},
		}),
	}),
})

export const {
	useSendMessageMutation,
	useCreateConnectionQuery,
	useStartChatMutation,
} = chatApi
