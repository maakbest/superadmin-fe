// CREATED BY SUPER ADMIN

import { APICore } from './apiCore'

const api = new APICore()

interface UserQueryParams {
	page?: number
	limit?: number
	search?: string
	country?: string
	sort?: string
}

function getusers(params: UserQueryParams = {}) {
	const baseUrl = '/dashboard/users/'
	return api.get(baseUrl, { ...params })
}

export { getusers }
