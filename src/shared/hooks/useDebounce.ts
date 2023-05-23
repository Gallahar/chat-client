import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay: number): T => {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const id = setTimeout(() => setDebouncedValue(value), delay)

		return () => clearTimeout(id)
	}, [delay, value])

	return debouncedValue
}
