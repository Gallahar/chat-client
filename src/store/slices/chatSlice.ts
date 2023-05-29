import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { authApi } from 'entities/auth/api'
import Cookies from 'js-cookie'
import { getCookiesData } from 'shared/lib/utils/getCookiesData'
import { IChat } from 'shared/models/chat.interface'
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
		},
		addNewMessage: (state, action: PayloadAction<IMessage>) => {
			state.chats
				.find((chat) => chat._id === action.payload.chatId)
				?.messages.push(action.payload)
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

export const { addNewChat, addNewMessage } = chatSlice.actions
