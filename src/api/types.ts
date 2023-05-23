import { IUser } from 'shared/models/user.interface'

export type ITokensResponse = {
	accessToken: string
}

export interface IBaseApiResponse {
	statusCode: number
	message: string
}

type TBaseApiErrorData = {
	statusCode: number
	message: string | string[]
	error: string
}

export interface IBaseApiErrorResponse {
	data: TBaseApiErrorData
	status: number
}

export interface IAuthResponse {
	tokens: ITokensResponse
	user: IUser
}
