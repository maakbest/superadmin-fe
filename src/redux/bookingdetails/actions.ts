// constants
import { BookingDetailsActionTypes } from './constants'

export interface BookingDetailsActionType {
	type: BookingDetailsActionTypes.API_RESPONSE_SUCCESS | BookingDetailsActionTypes.API_RESPONSE_ERROR | BookingDetailsActionTypes.GET_BOOKING_DETAILS | BookingDetailsActionTypes.GET_AMANDUS_DETAILS | BookingDetailsActionTypes.GET_BEST_DETAILS
	payload: {} | string
}

// common success
export const bookingDetailsApiResponseSuccess = (actionType: string, data: any): BookingDetailsActionType => ({
	type: BookingDetailsActionTypes.API_RESPONSE_SUCCESS,
	payload: { actionType, data },
})
// common error
export const bookingDetailsApiResponseError = (actionType: string, error: string): BookingDetailsActionType => ({
	type: BookingDetailsActionTypes.API_RESPONSE_ERROR,
	payload: { actionType, error },
})

export const bookingDetailsApiResponseLoading = (actionType: string) => ({
	type: BookingDetailsActionTypes.API_RESPONSE_LOADING,
	payload: { actionType },
})

export const getBookingDetails = (data: any, params: any) => ({
	type: BookingDetailsActionTypes.GET_BOOKING_DETAILS,
	payload: { data, params },
})

export const getAmandusDetails = (data: any) => ({
	type: BookingDetailsActionTypes.GET_AMANDUS_DETAILS,
	payload: { data },
})

export const getBestDetails = (data: any) => ({
	type: BookingDetailsActionTypes.GET_BEST_DETAILS,
	payload: { data },
})
