import { IUser } from 'shared/models/user.interface'

export interface ITokensResponse {
	access_token: string
}

export interface IBaseApiResponse {
	statusCode: number
	message: string
}

export interface IAuthResponse {
	tokens: ITokensResponse
	user: IUser
}
