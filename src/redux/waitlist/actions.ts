// constants
import { WaitlistActionTypes } from './constants'

export interface WaitlistsActionType {
	type: WaitlistActionTypes.API_RESPONSE_SUCCESS | WaitlistActionTypes.API_RESPONSE_ERROR | WaitlistActionTypes.GET_WAITLIST
	payload: {} | string
}

// common success
export const waitlistsApiResponseSuccess = (actionType: string, data: any): WaitlistsActionType => ({
	type: WaitlistActionTypes.API_RESPONSE_SUCCESS,
	payload: { actionType, data },
})
// common error
export const waitlistsApiResponseError = (actionType: string, error: string): WaitlistsActionType => ({
	type: WaitlistActionTypes.API_RESPONSE_ERROR,
	payload: { actionType, error },
})

export const getWaitlist = (data: any, params: any) => ({
	type: WaitlistActionTypes.GET_WAITLIST,
	payload: { data, params },
})

export const waitlistsApiResponseLoading = (actionType: string) => ({
	type: WaitlistActionTypes.API_RESPONSE_LOADING,
	payload: { actionType },
})
