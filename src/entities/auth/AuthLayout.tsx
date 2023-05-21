import { Outlet } from 'react-router-dom'
import { AuthContainer } from 'entities/auth/AuthContainer'

export function AuthLayout() {
	return (
		<AuthContainer>
			<Outlet />
		</AuthContainer>
	)
}
