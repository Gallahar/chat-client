import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { authApi } from 'entities/auth/api'
import Cookies from 'js-cookie'
import { getCookiesData } from 'shared/lib/utils/getCookiesData'
import { IChat, IDeleteChatDto } from 'shared/models/chat.interface'
import { IMessage } from 'shared/models/message.interface'

export interface IChatState {
	chats: IChat[]
}

const chatSlice = createSlice({
	name: 'chat',
	initialState: { chats: getCookiesData('chats') ?? [] } as IChatState,
	reducers: {
		addNewChat: (state, action: PayloadAction<IChat>) => {
			state.chats.push(action.payload)
			console.log(action.payload)
			Cookies.set('chats', JSON.stringify(state.chats))
		},
		deleteChatById: (state, action: PayloadAction<IDeleteChatDto>) => {
			const filteredChats = state.chats.filter(
				(chat) => chat._id !== action.payload.chatId
			)
			console.log(action.payload)
			state.chats = filteredChats
			Cookies.set('chats', JSON.stringify(filteredChats))
		},
		addNewMessage: (state, action: PayloadAction<IMessage>) => {
			state.chats
				.find((chat) => chat._id === action.payload.chatId)
				?.messages.push(action.payload)
		},
		deleteMessageById: (state, action: PayloadAction<string>) => {
			state.chats.find((chat) =>
				chat.messages.forEach((message, i, arr) =>
					message._id === action.payload ? arr.splice(i, 1) : message
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

export const { addNewChat, addNewMessage, deleteChatById, deleteMessageById } =
	chatSlice.actions
