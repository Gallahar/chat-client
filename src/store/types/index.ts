import { authApi } from 'entities/auth/api'
import { store } from 'store'
import userSlice from 'store/slices/userSlice'

export type AppDispatch = typeof store.dispatch
export type RootState = {
	userState: ReturnType<typeof userSlice>
	[authApi.reducerPath]: ReturnType<typeof authApi.reducer>
}