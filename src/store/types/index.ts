import { authApi } from 'entities/auth/api'
import { chatApi } from 'entities/chat/api'
import { fileApi } from 'entities/file/api'
import { userApi } from 'entities/user/api'
import { store } from 'store'
import userSlice from 'store/slices/userSlice'

export type AppDispatch = typeof store.dispatch
export type RootState = {
	userState: ReturnType<typeof userSlice>
	[authApi.reducerPath]: ReturnType<typeof authApi.reducer>
	[userApi.reducerPath]: ReturnType<typeof userApi.reducer>
	[chatApi.reducerPath]: ReturnType<typeof chatApi.reducer>
	[fileApi.reducerPath]: ReturnType<typeof fileApi.reducer>
}
