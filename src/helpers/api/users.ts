// CREATED BY SUPER ADMIN

import { APICore } from './apiCore'

const api = new APICore()

function getusers() {
	const baseUrl = '/dashboard/users/'
	return api.get(`${baseUrl}`, {})
}

export { getusers }
