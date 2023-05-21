export interface IAuthCreate {
	username: string
	email: string
	password: string
}

export type IAuthLogin = Omit<IAuthCreate, 'username'>
