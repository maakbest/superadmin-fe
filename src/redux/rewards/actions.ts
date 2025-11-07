// constants
import { RewardsActionTypes } from './constants'

export interface RewardsActionType {
	type: RewardsActionTypes.API_RESPONSE_SUCCESS | RewardsActionTypes.API_RESPONSE_ERROR | RewardsActionTypes.GET_USERS
	payload: {} | string
}

// common success
export const rewardsApiResponseSuccess = (actionType: string, data: any): RewardsActionType => ({
	type: RewardsActionTypes.API_RESPONSE_SUCCESS,
	payload: { actionType, data },
})
// common error
export const rewardsApiResponseError = (actionType: string, error: string): RewardsActionType => ({
	type: RewardsActionTypes.API_RESPONSE_ERROR,
	payload: { actionType, error },
})

export const getRewards = (data: any) => ({
	type: RewardsActionTypes.GET_USERS,
	payload: { data },
})
