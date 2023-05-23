import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from 'store'
import { selectUser } from 'store/selectors'

interface ProtectedRouteProps {
	children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const currentUser = useAppSelector(selectUser)
	const navigate = useNavigate()

	useEffect(() => {
		if (!currentUser) {
			navigate('/login', { replace: true })
		}
	}, [currentUser, navigate])

	return <div>{children}</div>
}
