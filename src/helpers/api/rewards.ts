// CREATED BY SUPER ADMIN

import { APICore } from './apiCore'

const api = new APICore()

function getrewards(params: any) {
	const baseUrl = '/dashboard/withdrawals/pending/'
	return api.get(`${baseUrl}`, { ...params })
}

function getrewardstimeline(id: any) {
	const baseUrl = `/dashboard/withdrawal/${id}/booking-details`
	return api.get(`${baseUrl}`)
}

function approveRequest(id: string) {
	const baseUrl = `/dashboard/withdrawal/${id}/approve`
	return api.create(`${baseUrl}`, {})
}

function rejectRequest(id: string) {
	const baseUrl = `/dashboard/withdrawal/${id}/reject`
	return api.create(`${baseUrl}`, {})
}

export { getrewards, approveRequest, rejectRequest, getrewardstimeline }
