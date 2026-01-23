// CREATED BY SUPER ADMIN

import { APICore } from './apiCore'

const api = new APICore()

function getallbookings(params: any) {
	const baseUrl = '/dashboard/bookings'
	return api.get(`${baseUrl}`, { ...params })
}

function getamandusdetails(id: any) {
	const baseUrl = `/dashboard/bookings/${id}/ama-data`
	return api.get(`${baseUrl}`)
}

function getbestdetails(id: string) {
	const baseUrl = `/dashboard/bookings/${id}/best-data`
	return api.get(`${baseUrl}`)
}

export { getallbookings, getamandusdetails, getbestdetails }
