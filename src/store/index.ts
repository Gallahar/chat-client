import { configureStore } from '@reduxjs/toolkit'
import { PreloadedState } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { authApi } from 'entities/auth/api/index'
import userSlice from './slices/userSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './types'


export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
	configureStore({
		reducer: {
			[authApi.reducerPath]: authApi.reducer,
			userState: userSlice,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({}).concat(authApi.middleware),
		preloadedState,
	})

export const store = setupStore()


export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

setupListeners(store.dispatch)
