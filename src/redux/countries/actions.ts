// constants
import { CountriesActionTypes } from './constants'

export interface CountriesActionType {
	type: CountriesActionTypes.API_RESPONSE_SUCCESS | CountriesActionTypes.API_RESPONSE_ERROR | CountriesActionTypes.GET_COUNTRIES
	payload: {} | string
}

// common success
export const countriesApiResponseSuccess = (actionType: string, data: any): CountriesActionType => ({
	type: CountriesActionTypes.API_RESPONSE_SUCCESS,
	payload: { actionType, data },
})
// common error
export const countriesApiResponseError = (actionType: string, error: string): CountriesActionType => ({
	type: CountriesActionTypes.API_RESPONSE_ERROR,
	payload: { actionType, error },
})

export const getCountries = (data: any) => ({
	type: CountriesActionTypes.GET_COUNTRIES,
	payload: { data },
})

export const countriesApiResponseLoading = (actionType: string) => ({
	type: CountriesActionTypes.API_RESPONSE_LOADING,
	payload: { actionType },
})
