import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/types'

const User = (state: RootState) => state.userState.user

const userAuth = (state: RootState) => state.userState.isAuth

const chats = (state: RootState) => state.chatState.chats

export const selectUser = createSelector([User], (User) => User)

export const selectUserAuth = createSelector([userAuth], (userAuth) => userAuth)

export const selectChats = createSelector([chats], (chats) => chats)

export const selectCurrentChat = createSelector(
	[chats, (_, id: string) => id],
	(chats, id) => {
		return chats.find((chat) => chat._id === id)
	}
)
