import { IUser } from 'shared/models/user.interface'
import { createSlice } from '@reduxjs/toolkit'
import { authApi } from 'entities/auth/api'

export type TUserState = {
	user: IUser | null
}

export const userSlice = createSlice({
	name: 'user',
	initialState: { user: null } as TUserState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			authApi.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.user = payload.user
			}
		)
	},
})

export default userSlice.reducer
