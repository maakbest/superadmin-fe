// constants
import { DashboardActionTypes } from './constants'

export interface DashboardActionType {
	type: DashboardActionTypes.API_RESPONSE_SUCCESS | DashboardActionTypes.API_RESPONSE_ERROR | DashboardActionTypes.GET_DAILY_ACTIVE_USERS | DashboardActionTypes.GET_REGISTERED_USERS | DashboardActionTypes.GET_TOTAL_ACTIVE_USERS | DashboardActionTypes.GET_VERIFIED_NOT_VERIFIED_USERS
	payload: {} | string
}

// common success
export const dashboardApiResponseSuccess = (actionType: string, data: any): DashboardActionType => ({
	type: DashboardActionTypes.API_RESPONSE_SUCCESS,
	payload: { actionType, data },
})
// common error
export const dashboardApiResponseError = (actionType: string, error: string): DashboardActionType => ({
	type: DashboardActionTypes.API_RESPONSE_ERROR,
	payload: { actionType, error },
})

export const getTotalActiveUsersAction = (data: any, params: any) => ({
	type: DashboardActionTypes.GET_TOTAL_ACTIVE_USERS,
	payload: { data, params },
})

export const getRegisteredUsersAction = (data: any, params: any) => ({
	type: DashboardActionTypes.GET_REGISTERED_USERS,
	payload: { data, params },
})

export const getVerfiedNotVerifiedActions = (data: any, params: any) => ({
	type: DashboardActionTypes.GET_VERIFIED_NOT_VERIFIED_USERS,
	payload: { data, params },
})

export const getDailyActiveUsersActions = (data: any, params: any) => ({
	type: DashboardActionTypes.GET_VERIFIED_NOT_VERIFIED_USERS,
	payload: { data, params },
})

export const dashboardApiResponseLoading = (actionType: string) => ({
	type: DashboardActionTypes.API_RESPONSE_LOADING,
	payload: { actionType },
})
