import { createApi } from '@reduxjs/toolkit/query/react'
import {
	IChat,
	IConnectionDto,
	IDeleteChatDto,
	IStartChatDto,
} from 'shared/models/chat.interface'
import { Socket, io } from 'socket.io-client'
import { ChatEvent } from 'shared/models/chat.interface'
import axiosBaseQuery from 'api/axiosBaseQuery'
import {
	ICreateMessage,
	IDeleteMessageResponse,
	IMessage,
	MessageEvent,
} from 'shared/models/message.interface'
import {
	addNewChat,
	addNewMessage,
	deleteChatById,
	deleteMessageById,
} from 'store/slices/chatSlice'

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
		createConnection: builder.query<void, IConnectionDto>({
			query: () => ({ data: [] }),
			async onCacheEntryAdded(
				id,
				{ cacheEntryRemoved, dispatch, cacheDataLoaded }
			) {
				try {
					await cacheDataLoaded

					const socket = getSocket()
					socket.emit(ChatEvent.ChatConnect, id, () => {
						console.log('connected')
					})

					socket.on(ChatEvent.ChatReceiveNew, (chat: IChat) => {
						dispatch(addNewChat(chat))
					})

					socket.on(
						ChatEvent.ChatReceiveDelete,
						(chatId: IDeleteChatDto) => {
							dispatch(deleteChatById(chatId))
						}
					)

					socket.on(MessageEvent.ReceiveNew, (message: IMessage) => {
						dispatch(addNewMessage(message))
					})

					socket.on(
						MessageEvent.ReceiveDelete,
						(data: IDeleteMessageResponse) => {
							dispatch(deleteMessageById(data.messageId))
						}
					)

					await cacheEntryRemoved
					console.log('i was removed')
					socket.off(ChatEvent.ChatReceiveNew)
					socket.off(ChatEvent.ChatReceiveDelete)
					socket.off(MessageEvent.ReceiveNew)
					socket.off(MessageEvent.ReceiveDelete)
				} catch (error) {
					console.log(error)
				}
			},
		}),
		startChat: builder.mutation<void, IStartChatDto>({
			query: () => ({ data: [] }),
			async onCacheEntryAdded(startChatDtoDto, { dispatch }) {
				try {
					const socket = getSocket()
					socket.emit(
						ChatEvent.ChatStart,
						startChatDtoDto,
						(chat: IChat) => {
							dispatch(addNewChat(chat))
						}
					)
				} catch (error) {
					console.log(error)
				}
			},
		}),
		deleteChat: builder.mutation<void, IDeleteChatDto>({
			query: () => ({ data: [] }),
			async onCacheEntryAdded(chatId, { dispatch }) {
				try {
					const socket = getSocket()
					socket.emit(ChatEvent.ChatDelete, chatId)
					dispatch(deleteChatById(chatId))
				} catch (error) {
					console.log(error)
				}
			},
		}),
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
		deleteMessage: builder.mutation<void, { messageId: string }>({
			query: () => ({ data: [] }),
			async onCacheEntryAdded(messageDto, { dispatch }) {
				try {
					const socket = getSocket()
					socket.emit(MessageEvent.DeleteMessage, messageDto)
					dispatch(deleteMessageById(messageDto.messageId))
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
	useDeleteChatMutation,
	useDeleteMessageMutation,
} = chatApi
