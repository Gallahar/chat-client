import { authApi } from 'entities/auth/api'
import { fileApi } from 'entities/file/api'
import { userApi } from 'entities/user/api'
import { store } from 'store'
import chatSlice from 'store/slices/chatSlice'
import userSlice from 'store/slices/userSlice'

export type AppDispatch = typeof store.dispatch
export type RootState = {
	chatState: ReturnType<typeof chatSlice>
	userState: ReturnType<typeof userSlice>
	[authApi.reducerPath]: ReturnType<typeof authApi.reducer>
	[userApi.reducerPath]: ReturnType<typeof userApi.reducer>
	[fileApi.reducerPath]: ReturnType<typeof fileApi.reducer>
}
