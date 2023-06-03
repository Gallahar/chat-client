import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { authApi } from 'entities/auth/api'
import Cookies from 'js-cookie'
import { getCookiesData } from 'shared/lib/utils/getCookiesData'
import {
	IChat,
	IConnectionDto,
	IDeleteChatDto,
	IStartChatDto,
} from 'shared/models/chat.interface'
import {
	ICreateMessage,
	IDeleteMessageResponse,
	IMessage,
} from 'shared/models/message.interface'

export interface IChatState {
	chats: IChat[]
	isConnected: boolean
}

const chatSlice = createSlice({
	name: 'chat',
	initialState: {
		chats: getCookiesData('chats') ?? [],
		isConnected: false,
	} as IChatState,
	reducers: {
		chatConnect: (state, action: PayloadAction<IConnectionDto>) => {
			state.isConnected = true
		},

		receiveNewChat: (state, action: PayloadAction<IChat>) => {
			state.chats.push(action.payload)
			Cookies.set('chats', JSON.stringify(state.chats))
		},
		startNewChat: (state, action: PayloadAction<IStartChatDto>) => {
			state.isConnected = true
		},
		deleteChatById: (state, action: PayloadAction<IDeleteChatDto>) => {
			const filteredChats = state.chats.filter(
				(chat) => chat._id !== action.payload.chatId
			)
			console.log(action.payload)
			state.chats = filteredChats
			Cookies.set('chats', JSON.stringify(filteredChats))
		},
		receiveDeleteChatById: (
			state,
			action: PayloadAction<IDeleteChatDto>
		) => {
			const filteredChats = state.chats.filter(
				(chat) => chat._id !== action.payload.chatId
			)
			console.log(action.payload)
			state.chats = filteredChats
			Cookies.set('chats', JSON.stringify(filteredChats))
		},
		receiveNewMessage: (state, action: PayloadAction<IMessage>) => {
			state.chats
				.find((chat) => chat._id === action.payload.chatId)
				?.messages.push(action.payload)
		},
		sendNewMessage: (state, action: PayloadAction<ICreateMessage>) => {
			state.isConnected = true
		},
		deleteMessageById: (
			state,
			action: PayloadAction<{ messageId: string }>
		) => {
			state.chats.find((chat) =>
				chat.messages.forEach((message, i, arr) =>
					message._id === action.payload.messageId
						? arr.splice(i, 1)
						: message
				)
			)
		},
		receiveDeleteMessageById: (
			state,
			action: PayloadAction<IDeleteMessageResponse>
		) => {
			state.chats.find((chat) =>
				chat.messages.forEach((message, i, arr) =>
					message._id === action.payload.messageId
						? arr.splice(i, 1)
						: message
				)
			)
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			authApi.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				console.log(payload)
				state.chats = payload.chats
				Cookies.set('chats', JSON.stringify(payload.chats))
			}
		),
			builder.addMatcher(
				authApi.endpoints.register.matchFulfilled,
				(state, { payload }) => {
					console.log(payload)
					state.chats = payload.chats
					Cookies.set('chats', JSON.stringify(payload.chats))
				}
			),
			builder.addMatcher(
				authApi.endpoints.refresh.matchFulfilled,
				(state, { payload }) => {
					state.chats = payload.chats
					Cookies.set('chats', JSON.stringify(payload.chats))
				}
			)
	},
})

export default chatSlice.reducer

export const {
	chatConnect,
	startNewChat,
	receiveNewChat,
	deleteChatById,
	receiveDeleteChatById,
	sendNewMessage,
	receiveNewMessage,
	deleteMessageById,
	receiveDeleteMessageById,
} = chatSlice.actions