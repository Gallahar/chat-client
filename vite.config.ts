import { defineConfig } from 'vite'
import { config } from 'dotenv'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

config()
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	server: {
		proxy: {
			'^/upload': {
				target: process.env.VITE_PUBLIC_FILES_BASE_URL,
			},
		},
	},
})
