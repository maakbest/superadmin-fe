// constants
import { RewardsActionTypes } from './constants'

export interface RewardsActionType {
	type: RewardsActionTypes.API_RESPONSE_SUCCESS | RewardsActionTypes.API_RESPONSE_ERROR | RewardsActionTypes.GET_REWARDS | RewardsActionTypes.REQUEST_APPROVED | RewardsActionTypes.REQUEST_REJECTED
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
	type: RewardsActionTypes.GET_REWARDS,
	payload: { data },
})

export const requestApprovedAction = (id: string) => ({
	type: RewardsActionTypes.REQUEST_APPROVED,
	payload: { id },
})

export const requestRejectedAction = (id: string) => ({
	type: RewardsActionTypes.REQUEST_REJECTED,
	payload: { id },
})

export const rewardsApiResponseLoading = (actionType: string) => ({
	type: RewardsActionTypes.API_RESPONSE_LOADING,
	payload: { actionType },
})
