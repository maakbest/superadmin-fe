// constants
import { UsersActionTypes } from './constants'

export interface UsersActionType {
	type: UsersActionTypes.API_RESPONSE_SUCCESS | UsersActionTypes.API_RESPONSE_ERROR | UsersActionTypes.GET_USERS
	payload: {} | string
}

// common success
export const usersApiResponseSuccess = (actionType: string, data: any): UsersActionType => ({
	type: UsersActionTypes.API_RESPONSE_SUCCESS,
	payload: { actionType, data },
})
// common error
export const usersApiResponseError = (actionType: string, error: string): UsersActionType => ({
	type: UsersActionTypes.API_RESPONSE_ERROR,
	payload: { actionType, error },
})

export const getUsers = (data: any) => ({
	type: UsersActionTypes.GET_USERS,
	payload: { data },
})

export const usersApiResponseLoading = (actionType: string) => ({
	type: UsersActionTypes.API_RESPONSE_LOADING,
	payload: { actionType },
})
