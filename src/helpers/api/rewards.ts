// CREATED BY SUPER ADMIN

import { APICore } from './apiCore'

const api = new APICore()

function getrewards() {
	const baseUrl = '/dashboard/withdrawals/pending/'
	return api.get(`${baseUrl}`, {})
}

export { getrewards }
