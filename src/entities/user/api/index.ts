import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from 'api/axiosBaseQuery'
import { IUpdateAvatar, IUser } from 'shared/models/user.interface'

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
		updateAvatar: builder.mutation<IUser, IUpdateAvatar>({
			query: (avatarUrl) => ({
				url: `/user/update-avatar`,
				method: 'POST',
				headers: { ContentType: 'application/json' },
				data: avatarUrl,
			}),
		}),
	}),
})

export const { useGetUserByIdQuery, useFindUserQuery,useUpdateAvatarMutation } = userApi
