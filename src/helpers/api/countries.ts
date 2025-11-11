import { APICore } from './apiCore'

const api = new APICore()

function getcountries() {
	const baseUrl = '/countries/'
	return api.get(`${baseUrl}`, {})
}

export { getcountries }
