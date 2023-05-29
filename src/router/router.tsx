import { AuthLayout } from 'entities/auth/AuthLayout'
import { ChatLayout } from 'entities/chat/components/ChatLayout'
import { Login } from 'pages/Login'
import { ProfilePage } from 'pages/ProfilePage'
import { Register } from 'pages/Register'
import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { ChatPage } from 'pages/ChatPage'
import { Chats } from 'pages/Chats'

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
		path: '/chats',
		children: [
			{ path: '', element: <Chats /> },
			{ path: ':id', element: <ChatPage /> },
			{ path: 'profile/:id', element: <ProfilePage /> },
		],
	},
])
