import { IUser } from 'shared/models/user.interface'
import { createSlice } from '@reduxjs/toolkit'
import { authApi } from 'entities/auth/api'
import Cookies from 'js-cookie'
import { getCookiesData } from 'shared/lib/utils/getCookiesData'
import { userApi } from 'entities/user/api'
import { fileApi } from 'entities/file/api'

export interface TUserState {
	user: IUser
	isAuth: boolean
}

const initialState = {
	_id: '',
	username: '',
	email: '',
	avatar: '',
}

const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: getCookiesData('user') ?? initialState,
		isAuth: getCookiesData('isAuth') ?? false,
	} as TUserState,
	reducers: {
		logout: (state) => {
			state.user = initialState
			state.isAuth = false
			Cookies.remove('user')
			Cookies.remove('isAuth')
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			authApi.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.user = payload.user
				state.isAuth = true
				Cookies.set('user', JSON.stringify(payload.user))
				Cookies.set('isAuth', JSON.stringify(true))
			}
		),
			builder.addMatcher(
				authApi.endpoints.register.matchFulfilled,
				(state, { payload }) => {
					state.user = payload.user
					state.isAuth = true
					Cookies.set('user', JSON.stringify(payload.user))
					Cookies.set('isAuth', JSON.stringify(true))
				}
			),
			builder.addMatcher(
				authApi.endpoints.refresh.matchFulfilled,
				(state, { payload }) => {
					state.user = payload.user
					state.isAuth = true
					Cookies.set('user', JSON.stringify(payload.user))
					Cookies.set('isAuth', JSON.stringify(true))
				}
			),
			builder.addMatcher(
				userApi.endpoints.updateAvatar.matchFulfilled,
				(state, { payload }) => {
					state.user.avatar = payload.avatar
					const userData = getCookiesData('user') ?? initialState
					userData.avatar = payload.avatar
					Cookies.set('user', JSON.stringify(userData))
				}
			),
			builder.addMatcher(
				fileApi.endpoints.deleteFile.matchFulfilled,
				(state) => {
					state.user.avatar = ''
					const userData = getCookiesData('user') ?? initialState
					userData.avatar = ''
					Cookies.set('user', JSON.stringify(userData))
				}
			)
	},
})

export default userSlice.reducer

export const { logout } = userSlice.actions
