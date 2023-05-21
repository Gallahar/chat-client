import { AuthLayout } from 'entities/auth/AuthLayout'
import { Login } from 'pages/Login'
import { Register } from 'pages/Register'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
	{
		element: <AuthLayout />,
		path: '/',
		children: [
			{ path: 'login', element: <Login /> },
			{ path: 'register', element: <Register /> },
		],
	},
])
