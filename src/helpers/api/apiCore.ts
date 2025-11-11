import axios from 'axios'
import config from '../../config'
import { getAuthSession, setAuthSession } from '@/utils/storage'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = config.API_URL

// ✅ Interceptor to handle errors
axios.interceptors.response.use(
	(response) => response,
	(error) => {
		let message

		if (error?.response?.status === 404) {
			// window.location.href = '/not-found'
		} else if (error?.response?.status === 403) {
			window.location.href = '/access-denied'
		} else {
			switch (error?.response?.status) {
				case 401:
					message = 'Invalid credentials'
					break
				case 403:
					message = 'Access Forbidden'
					break
				case 404:
					message = 'Data not found'
					break
				default:
					message = error.response?.data?.message || error.message || error
			}
		}
		return Promise.reject(message)
	}
)

export const AUTH_SESSION_KEY = 'best_super_admin'

/**
 * ✅ Always set or clear Authorization header
 */
export const setAuthorization = (token: string | null) => {
	if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
	else delete axios.defaults.headers.common['Authorization']
}

class APICore {
	constructor() {
		// ✅ Automatically attach Authorization token on every request
		axios.interceptors.request.use((config) => {
			const session = getAuthSession()
			const token = session?.token
			if (token) {
				config.headers.Authorization = `Bearer ${token}`
			}
			return config
		})
	}

	get = (url: string, params?: Record<string, any>) => {
		const queryString = params
			? Object.entries(params)
					.map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
					.join('&')
			: ''

		return axios.get(queryString ? `${url}?${queryString}` : url)
	}

	getFile = (url: string, params?: Record<string, any>) => {
		const queryString = params
			? Object.entries(params)
					.map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
					.join('&')
			: ''

		return axios.get(queryString ? `${url}?${queryString}` : url, { responseType: 'blob' })
	}

	getMultiple = (urls: string[], params?: Record<string, any>) => {
		const queryString = params
			? Object.entries(params)
					.map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
					.join('&')
			: ''
		const requests = urls.map((url) => axios.get(queryString ? `${url}?${queryString}` : url))
		return axios.all(requests)
	}

	create = (url: string, data?: any) => axios.post(url, data || {})

	updatePatch = (url: string, data: any) => axios.patch(url, data)

	update = (url: string, data: any) => axios.put(url, data)

	delete = (url: string) => axios.delete(url)

	createWithFile = (url: string, data: any) => {
		const formData = new FormData()
		for (const key in data) formData.append(key, data[key])
		return axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
	}

	updateWithFile = (url: string, data: any) => {
		const formData = new FormData()
		for (const key in data) formData.append(key, data[key])
		return axios.patch(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
	}

	isUserAuthenticated = () => {
		const token = getAuthSession()?.token
		return Boolean(token)
	}

	setLoggedInUser = (session: any) => {
		if (!session) return false
		if (session) {
			setAuthSession(session)
			setAuthorization(session?.token || null) // ✅ Update axios header immediately
		}
	}

	getLoggedInUser = () => getAuthSession()

	setUserInSession = (modifiedUser: any) => {
		const session = getAuthSession()
		if (session) {
			setAuthSession({ ...session, ...modifiedUser })
		}
	}
}

/**
 * ✅ Ensure token attached even on initial load
 */
const session = getAuthSession()
if (session?.token) {
	setAuthorization(session.token)
}

export { APICore }
