// apicore
import { APICore } from '../../helpers/api/apiCore'

// constants
import { BookingDetailsActionTypes } from './constants'

const api = new APICore()

const INIT_STATE: State = {
	allBookings: [],
	amandusDetails: null,
	bestDetails: null,
	loading: false,
	meta: {},
}

interface State {
	allBookings?: any
	amandusDetails: any
	bestDetails: any
	loading?: boolean
	value?: boolean
	meta: any
}

const BookingDetails = (state: State = INIT_STATE, action: any): any => {
	switch (action.type) {
		case BookingDetailsActionTypes.API_RESPONSE_LOADING:
			return {
				...state,
				loading: true,
				error: null,
			}

		case BookingDetailsActionTypes.API_RESPONSE_SUCCESS:
			switch (action.payload.actionType) {
				case BookingDetailsActionTypes.GET_BOOKING_DETAILS: {
					const { data } = action.payload
					return {
						...state,
						allBookings: data.data,
						meta: data.meta,
						loading: false,
					}
				}

				case BookingDetailsActionTypes.GET_AMANDUS_DETAILS: {
					const { data } = action.payload
					return {
						...state,
						amandusDetails: data.data,
						loading: false,
					}
				}
				case BookingDetailsActionTypes.GET_BEST_DETAILS: {
					const { data } = action.payload

					return {
						...state,
						bestDetails: data.data,
						loading: false,
					}
				}

				default:
					return { ...state }
			}

		case BookingDetailsActionTypes.API_RESPONSE_ERROR:
			switch (action.payload.actionType) {
				case BookingDetailsActionTypes.GET_BOOKING_DETAILS: {
					return {
						...state,
						allRewards: [],
						error: action.payload.error,
						loading: false,
					}
				}

				case BookingDetailsActionTypes.GET_AMANDUS_DETAILS: {
					return {
						...state,
						amandusDetails: [],
						error: action.payload.error,
						loading: false,
					}
				}

				case BookingDetailsActionTypes.GET_BEST_DETAILS: {
					return {
						...state,
						bestDetails: [],
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

export default BookingDetails
