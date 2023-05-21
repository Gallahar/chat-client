import axiosInstance, {
	AxiosError,
	InternalAxiosRequestConfig,
	AxiosResponse,
} from 'axios'
import Cookies from 'js-cookie'
import { IAuthResponse } from './types'

const CancelToken = axiosInstance.CancelToken

const axios = axiosInstance.create({
	baseURL: import.meta.env.VITE_PUBLIC_BASE_URL,
	responseType: 'json',
	withCredentials: true,
})

axios.interceptors.request.use(
	async (
		config: InternalAxiosRequestConfig
	): Promise<InternalAxiosRequestConfig> => {
		const accessToken = Cookies.get('accessToken')
		if (config.headers && accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}
		return config
	}
)

const onRejectedResponse = async (
	error: AxiosError<{ message: string }>
): Promise<AxiosError> => {
	if (error.response?.status === 401) {
		try {
			const response: AxiosResponse = await axios.get('auth/refresh', {
				withCredentials: true,
			})
			updateCookie(response)
			if (error.config) return axios.request(error.config)
		} catch (e) {
			console.log(e)
		}
	}

	throw error
}

const onFulfilledResponse = async (
	response: AxiosResponse<IAuthResponse>
): Promise<AxiosResponse> => {
	updateCookie(response)
	return response
}

const updateCookie = (response: AxiosResponse<IAuthResponse>) => {
	const data = response?.data
	if ('access_token' in data) {
		Cookies.set('accessToken', data.tokens.access_token)
	}
}

axios.interceptors.response.use(onFulfilledResponse, onRejectedResponse)

export { axios, CancelToken }
