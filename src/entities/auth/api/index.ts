import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from 'api/axiosBaseQuery'
import { IAuthResponse } from 'api/types'
import { IAuthCreate, IAuthLogin } from 'shared/models/auth.interface'

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: axiosBaseQuery(),
	endpoints: (builder) => ({
		register: builder.mutation<IAuthResponse, IAuthCreate>({
			query: (dto) => ({
				url: '/auth/registration',
				method: 'POST',
				headers: { ContentType: 'application/json' },
				data: dto,
			}),
		}),
		login: builder.mutation<IAuthResponse, IAuthLogin>({
			query: (dto) => ({
				url: '/auth/login',
				method: 'POST',
				headers: { ContentType: 'application/json' },
				data: dto,
			}),
		}),
	}),
})

export const { useRegisterMutation, useLoginMutation } = authApi
