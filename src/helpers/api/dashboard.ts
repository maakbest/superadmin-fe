// CREATED BY SUPER ADMIN

import { APICore } from './apiCore'

const api = new APICore()

function getdailyactiveusers(params: any) {
	const baseUrl = '/dashboard/analytics/daily-active-users/'
	return api.get(`${baseUrl}`, { ...params })
}

function getregisteredusers(params: any) {
	const baseUrl = '/dashboard/analytics/registered-users/'
	return api.get(`${baseUrl}`, { ...params })
}

function gettotalactive(params: any) {
	const baseUrl = '/dashboard/analytics/top-active-users/'
	return api.get(`${baseUrl}`, { ...params })
}

function getverifiednotverifiedusers(params: any) {
	const baseUrl = '/dashboard/analytics/user-graph/'
	return api.get(`${baseUrl}`, { ...params })
}

export { getdailyactiveusers, getregisteredusers, gettotalactive, getverifiednotverifiedusers }
