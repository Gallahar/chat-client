import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from 'store'
import { selectUserAuth } from 'store/selectors'

interface ProtectedRouteProps {
	children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const Authenticated = useAppSelector(selectUserAuth)
	const navigate = useNavigate()

	useEffect(() => {
		if (!Authenticated) {
			navigate('/login', { replace: true })
		}
	}, [Authenticated, navigate])

	return <div>{children}</div>
}
