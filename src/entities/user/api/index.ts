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
	tagTypes: ['Avatar', 'Users'],
	endpoints: (builder) => ({
		findUser: builder.query<IUser[], TFindUserInput>({
			query: ({ value, type }) => ({
				url: `/user/find?value=${value}&search_by=${
					type ? 'email' : 'username'
				}`,
				method: 'GET',
				headers: { ContentType: 'application/json' },
			}),
			providesTags: ['Users'],
		}),
		getUserById: builder.query<IUser, string>({
			query: (id) => ({
				url: `/user/${id}`,
				method: 'GET',
				headers: { ContentType: 'application/json' },
			}),
			providesTags: ['Users'],
		}),
		updateAvatar: builder.mutation<Pick<IUser, 'avatar'>, IUpdateAvatar>({
			query: (avatarUrl) => ({
				url: `/user/update-avatar`,
				method: 'POST',
				headers: { ContentType: 'application/json' },
				data: avatarUrl,
			}),
			invalidatesTags: ['Avatar'],
		}),
	}),
})

export const {
	useGetUserByIdQuery,
	useFindUserQuery,
	useUpdateAvatarMutation,
} = userApi
