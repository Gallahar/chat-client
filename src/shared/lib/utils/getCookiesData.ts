import Cookies from 'js-cookie'
import { IUser } from 'shared/models/user.interface'

export const getCookiesData = (name: string): IUser | null => {
	const data = Cookies.get(name) || null

	return data ? JSON.parse(data) : data
}
