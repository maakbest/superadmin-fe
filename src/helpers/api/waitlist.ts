// CREATED BY SUPER ADMIN

import { APICore } from './apiCore'

const api = new APICore()

function getwaitlist(params: any) {
	const baseUrl = '/dashboard/waitlist'
	return api.get(`${baseUrl}`, { ...params })
}

export { getwaitlist }
