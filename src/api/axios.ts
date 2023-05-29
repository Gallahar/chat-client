import axiosInstance, {
	AxiosError,
	InternalAxiosRequestConfig,
	AxiosResponse,
} from 'axios'
import Cookies from 'js-cookie'
import { IAuthResponse } from './types'

const CancelToken = axiosInstance.CancelToken

const axios = axiosInstance.create({
	baseURL: import.meta.env.VITE_PUBLIC_API_BASE_URL,
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
	if (
		error.response?.data.message === 'Access token validation failed' &&
		error.response?.status === 401
	) {
		try {
			const response: AxiosResponse<IAuthResponse> = await axios.post(
				'auth/refresh',
				{
					withCredentials: true,
				}
			)
			updateCookie(response)
			if (error.config) return axios.request(error.config)
		} catch (e) {
			Cookies.remove('isAuth')
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
	if (data.tokens) {
		Cookies.set('accessToken', data.tokens.accessToken)
	}
}

axios.interceptors.response.use(onFulfilledResponse, onRejectedResponse)

export { axios, CancelToken }
