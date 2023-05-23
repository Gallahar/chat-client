import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from 'api/axiosBaseQuery'
import { IUser } from 'shared/models/user.interface'

type TFindUserInput = {
	value: string
	type: boolean
}

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: axiosBaseQuery(),
	endpoints: (builder) => ({
		findUser: builder.query<IUser[], TFindUserInput>({
			query: ({ value, type }) => ({
				url: `/user/find?value=${value}&search_by=${
					type ? 'email' : 'username'
				}`,
				method: 'GET',
				headers: { ContentType: 'application/json' },
			}),
			
		}),
		getUserById: builder.query<IUser, string>({
			query: (id) => ({
				url: `/user/${id}`,
				method: 'GET',
				headers: { ContentType: 'application/json' },
			}),
		}),
	}),
})

export const { useGetUserByIdQuery, useFindUserQuery } = userApi
