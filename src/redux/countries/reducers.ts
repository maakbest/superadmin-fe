// constants
import { CountriesActionTypes } from './constants'

const INIT_STATE = {
	allCountries: [],
	loading: false,
}

interface State {
	allCountries?: any
	loading?: boolean
	value?: boolean
}

const Auth = (state: State = INIT_STATE, action: any): any => {
	switch (action.type) {
		case CountriesActionTypes.API_RESPONSE_LOADING:
			return {
				...state,
				loading: true,
				error: null,
			}

		case CountriesActionTypes.API_RESPONSE_SUCCESS:
			switch (action.payload.actionType) {
				case CountriesActionTypes.GET_COUNTRIES: {
					const { data } = action.payload
					return {
						...state,
						allCountries: data.data,
						loading: false,
					}
				}
				default:
					return { ...state }
			}

		case CountriesActionTypes.API_RESPONSE_ERROR:
			switch (action.payload.actionType) {
				case CountriesActionTypes.GET_COUNTRIES: {
					return {
						...state,
						error: action.payload.error,
						loading: false,
					}
				}

				default:
					return { ...state }
			}

		default:
			return { ...state }
	}
}

export default Auth
