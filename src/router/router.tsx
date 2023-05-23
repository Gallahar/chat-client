import { AuthLayout } from 'entities/auth/AuthLayout'
import { ChatLayout } from 'entities/chat/ChatLayout'
import { Login } from 'pages/Login'
import { ProfilePage } from 'pages/ProfilePage'
import { Register } from 'pages/Register'
import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'

export const router = createBrowserRouter([
	{
		element: <AuthLayout />,
		children: [
			{ path: 'login', element: <Login /> },
			{ path: 'register', element: <Register /> },
		],
	},
	{
		element: (
			<ProtectedRoute>
				<ChatLayout />
			</ProtectedRoute>
		),
		path: '/',
		children: [{ path: 'profile/:id', element: <ProfilePage /> }],
	},
])
