import Cookies from 'js-cookie'
import { IUser } from 'shared/models/user.interface'

export const getCookiesData = (key: string): IUser | null => {
	const data = Cookies.get(key) || null

	return data ? JSON.parse(data) : data
}
