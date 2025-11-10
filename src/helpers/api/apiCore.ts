import axios from 'axios'

import config from '../../config'
import { getAuthSession, setAuthSession } from '@/utils/storage'

// content type
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = config.API_URL
// intercepting to capture errors
axios.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		let message

		if (error && error.response && error.response.status === 404) {
			// window.location.href = '/not-found';
		} else if (error && error.response && error.response.status === 403) {
			window.location.href = '/access-denied'
		} else {
			switch (error.response.status) {
				case 401:
					message = 'Invalid credentials'
					break
				case 403:
					message = 'Access Forbidden'
					break
				case 404:
					message = 'Sorry! the data you are looking for could not be found'
					break
				default: {
					message = error.response && error.response.data ? error.response.data['message'] : error.message || error
				}
			}
			return Promise.reject(message)
		}
	}
)

export const AUTH_SESSION_KEY = 'best_super_admin'

/**
 * Sets the default authorization
 * @param {*} token
 */

const setAuthorization = (token: string | null) => {
	if (token) axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
	else delete axios.defaults.headers.common['Authorization']
}

class APICore {
	/**
	 * Fetches data from given url
	 */
	get = (url: string, params: any) => {
		let response
		if (params) {
			const queryString = params
				? Object.keys(params)
						.map((key) => key + '=' + params[key])
						.join('&')
				: ''
			response = axios.get(`${url}?${queryString}`, params)
		} else {
			response = axios.get(`${url}`, params)
		}
		return response
	}

	getFile = (url: string, params: any) => {
		let response
		if (params) {
			const queryString = params
				? Object.keys(params)
						.map((key) => key + '=' + params[key])
						.join('&')
				: ''
			response = axios.get(`${url}?${queryString}`, { responseType: 'blob' })
		} else {
			response = axios.get(`${url}`, { responseType: 'blob' })
		}
		return response
	}

	getMultiple = (urls: string, params: any) => {
		const reqs = []
		let queryString = ''
		if (params) {
			queryString = params
				? Object.keys(params)
						.map((key) => key + '=' + params[key])
						.join('&')
				: ''
		}

		for (const url of urls) {
			reqs.push(axios.get(`${url}?${queryString}`))
		}
		return axios.all(reqs)
	}

	/**
	 * post given data to url
	 */
	create = (url: string, data: any) => {
		if (data && Object.keys(data).length > 0) {
			return axios.post(url, data)
		} else {
			return axios.post(url)
		}
	}

	/**
	 * Updates patch data
	 */
	updatePatch = (url: string, data: any) => {
		return axios.patch(url, data)
	}

	/**
	 * Updates data
	 */
	update = (url: string, data: any) => {
		return axios.put(url, data)
	}

	/**
	 * Deletes data
	 */
	delete = (url: string) => {
		return axios.delete(url)
	}

	/**
	 * post given data to url with file
	 */
	createWithFile = (url: string, data: any) => {
		const formData = new FormData()
		for (const k in data) {
			formData.append(k, data[k])
		}

		const config = {
			headers: {
				...axios.defaults.headers,
				'content-type': 'multipart/form-data',
			},
		}
		return axios.post(url, formData, config)
	}

	/**
	 * post given data to url with file
	 */
	updateWithFile = (url: string, data: any) => {
		const formData = new FormData()
		for (const k in data) {
			formData.append(k, data[k])
		}

		const config = {
			headers: {
				...axios.defaults.headers,
				'content-type': 'multipart/form-data',
			},
		}
		return axios.patch(url, formData, config)
	}

	isUserAuthenticated = () => {
		const session = getAuthSession()
		const token = session?.token
		if (!token) return false
		return true
	}

	setLoggedInUser = (session: any) => {
		if (!session) return false
		if (session) {
			setAuthSession(session)
		}
	}
	/**
	 * Returns the logged in user
	 */
	getLoggedInUser = () => {
		const session = getAuthSession()
		const token = session?.token
		return token
	}

	setUserInSession = (modifiedUser: any) => {
		const userInfo = sessionStorage.getItem(AUTH_SESSION_KEY)
		if (userInfo) {
			const { token, user } = JSON.parse(userInfo)
			this.setLoggedInUser({ token, ...user, ...modifiedUser })
		}
	}
}

/*
Check if token available in session
*/

const session = getAuthSession()
const token = session?.token
if (token) {
	setAuthorization(token)
}

export { APICore, setAuthorization }
