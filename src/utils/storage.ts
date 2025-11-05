import { AUTH_SESSION_KEY } from '@/helpers/api/apiCore'

export const setAuthSession = (data: Record<string, unknown>) => {
	const cookieValue = encodeURIComponent(JSON.stringify(data))

	// Set cookie with secure flags
	document.cookie = `${AUTH_SESSION_KEY}=${cookieValue}; Path=/; ${process.env.NODE_ENV === 'production' ? 'Secure; ' : ''}SameSite=Lax; max-age=${60 * 60 * 24 * 7}` // 1 week expiration
}

export const updateAuthSession = (updates: Record<string, unknown>) => {
	const existing = getAuthSession() // parse current cookie JSON
	const merged = { ...existing, ...updates }
	setAuthSession(merged)
}

export const getAuthSession = () => {
	try {
		const cookies = document.cookie.split(';')
		const sessionCookie = cookies.find((c) => c.trim().startsWith(`${AUTH_SESSION_KEY}=`))

		if (!sessionCookie) return null

		const value = sessionCookie.split('=')[1]
		return JSON.parse(decodeURIComponent(value))
	} catch (error) {
		console.error('Session parse error:', error)
		return null
	}
}

export const clearAuthSession = () => {
	document.cookie = `${AUTH_SESSION_KEY}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}
