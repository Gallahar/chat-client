import { configureStore } from '@reduxjs/toolkit'
import { PreloadedState } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { authApi } from 'entities/auth/api/index'
import userSlice from './slices/userSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './types'
import { userApi } from 'entities/user/api'
import { fileApi } from 'entities/file/api'
import chatSlice from './slices/chatSlice'
import chatMiddleware from './middlewares/chatMiddleware'

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
	configureStore({
		reducer: {
			[authApi.reducerPath]: authApi.reducer,
			[userApi.reducerPath]: userApi.reducer,
			[fileApi.reducerPath]: fileApi.reducer,
			userState: userSlice,
			chatState: chatSlice,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({}).concat(
				authApi.middleware,
				userApi.middleware,
				fileApi.middleware,
				chatMiddleware
			),
		preloadedState,
	})

export const store = setupStore()

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

setupListeners(store.dispatch)
