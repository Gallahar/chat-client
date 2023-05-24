import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from 'api/axiosBaseQuery'
import { IFileResponse, IFileUpload } from './types'

export const fileApi = createApi({
	reducerPath: 'fileApi',
	tagTypes: ['Upload', 'Delete'],
	baseQuery: axiosBaseQuery(),
	endpoints: (builder) => ({
		uploadFile: builder.mutation<IFileResponse, IFileUpload>({
			query: ({ file, folder }) => ({
				url: `/files/upload?folder=${folder}`,
				method: 'POST',
				headers: { ContentType: 'multipart/form-data' },
				data: file,
			}),
			invalidatesTags: ['Upload'],
		}),
		deleteFile: builder.mutation<void, string>({
			query: (path) => ({
				url: `/files/delete?path=${path}`,
				method: 'DELETE',
				headers: { ContentType: 'application/json' },
			}),
			invalidatesTags: ['Delete'],
		}),
	}),
})

export const { useUploadFileMutation, useDeleteFileMutation } = fileApi
