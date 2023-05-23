import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import { router } from 'router/router'
import { setupStore } from './store'

const store = setupStore()

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<Provider store={store}>
			<ToastContainer />
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
)
