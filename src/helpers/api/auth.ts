import { APICore } from './apiCore'

const api = new APICore()

// account
function login(params: { username: string; password: string }) {
	const { username, password } = params
	const baseUrl = '/dashboard/login/'
	return api.create(`${baseUrl}`, { email: username, password })
}

function logout() {
	const baseUrl = '/dashboard/logout/'
	return api.create(`${baseUrl}`, {})
}

function signup(params: { fullname: string; email: string; password: string }) {
	const baseUrl = '/register/'
	return api.create(`${baseUrl}`, params)
}

function forgotPassword(params: { username: string }) {
	const baseUrl = '/forgot-password/'
	return api.create(`${baseUrl}`, params)
}

export { login, logout, signup, forgotPassword }
