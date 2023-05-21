import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig } from 'axios'
import { axios } from './axios'
import Axios from 'axios'
import { IBaseApiResponse } from './types'

export interface AxiosBaseQueryArgs<Meta, Response = IBaseApiResponse> {
	meta?: Meta
	transformResponse?: (response: Response) => unknown
}

export interface ServiceExtraOptions {
	authRequired?: boolean
}

const axiosBaseQuery = <
	Args extends AxiosRequestConfig,
	Result = unknown,
	DefinitionExtraOptions extends ServiceExtraOptions = Record<
		string,
		unknown
	>,
	Meta = Record<string, unknown>
>({ meta, transformResponse }: AxiosBaseQueryArgs<Meta> = {}): BaseQueryFn<
	Args,
	Result,
	unknown,
	DefinitionExtraOptions,
	Meta
> => {
	return async (args, api, extraOptions) => {
		try {
			const result = await axios({
				...args,
				signal: api.signal,
				...extraOptions,
			})

			return {
				data: transformResponse
					? transformResponse(result.data)
					: result.data,
			}
		} catch (err) {
			if (!Axios.isAxiosError(err)) {
				return {
					error: err,
					meta,
				}
			}

			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
				},
				meta,
			}
		}
	}
}

export default axiosBaseQuery
