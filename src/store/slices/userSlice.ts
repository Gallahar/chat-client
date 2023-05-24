import { IUser } from 'shared/models/user.interface'
import { createSlice } from '@reduxjs/toolkit'
import { authApi } from 'entities/auth/api'
import Cookies from 'js-cookie'
import { getCookiesData } from 'shared/lib/utils/getCookiesData'
import { userApi } from 'entities/user/api'

export interface TUserState {
	user: IUser | null
}

export const userSlice = createSlice({
	name: 'user',
	initialState: { user: getCookiesData('user') } as TUserState,
	reducers: {
		logout: (state) => {
			state.user = null
			Cookies.remove('user')
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			authApi.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.user = payload.user
				Cookies.set('user', JSON.stringify(payload.user))
			}
		),
			builder.addMatcher(
				userApi.endpoints.updateAvatar.matchFulfilled,
				(state, { payload }) => {
					state.user = payload
					Cookies.set('user', JSON.stringify(payload))
				}
			)
	},
})

export default userSlice.reducer

export const { logout } = userSlice.actions
