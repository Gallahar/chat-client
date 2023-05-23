import { createApi } from '@reduxjs/toolkit/query/react'
import { IMessage } from 'shared/models/chat.interface'
import { Socket, io } from 'socket.io-client'
import { ChatEvent } from 'shared/models/chat.interface'
import axiosBaseQuery from 'api/axiosBaseQuery'

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
		sendMessage: builder.mutation<IMessage, IMessage>({
			queryFn: (chatMessageContent) => {
				const socket = getSocket()
				return new Promise((resolve) => {
					socket.emit(
						ChatEvent.CreateMessage,
						chatMessageContent,
						(message: IMessage) => {
							resolve({ data: message })
							console.log(message)
						}
					)
				})
			},
		}),
	}),
})

export const { useSendMessageMutation } = chatApi
