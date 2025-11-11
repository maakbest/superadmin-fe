import { all, fork, put, takeEvery, call } from 'redux-saga/effects'
import { SagaIterator } from '@redux-saga/core'
import { APICore } from '../../helpers/api/apiCore'
import { getrewards as getRewardsApi, approveRequest as approveRequestApi, rejectRequest as rejectRequestApi } from '../../helpers/api/rewards'
import { rewardsApiResponseSuccess, rewardsApiResponseError, rewardsApiResponseLoading } from './actions'
import { RewardsActionTypes } from './constants'

const api = new APICore()

/**
 * Get All Rewards Saga
 */
function* getAllRewards(): SagaIterator {
	try {
		// ✅ Dispatch loading before API call
		yield put(rewardsApiResponseLoading(RewardsActionTypes.API_RESPONSE_LOADING))

		const response = yield call(getRewardsApi)
		const rewards = response.data
		yield put(rewardsApiResponseSuccess(RewardsActionTypes.GET_REWARDS, rewards))
	} catch (error: any) {
		yield put(rewardsApiResponseError(RewardsActionTypes.GET_REWARDS, error))
	}
}

/**
 * Approve Reward Request
 */
function* approveRewardRequest({ payload: id }: any): SagaIterator {
	try {
		// ✅ Dispatch loading before API call
		yield put(rewardsApiResponseLoading(RewardsActionTypes.API_RESPONSE_LOADING))

		yield call(approveRequestApi, id)
		yield put(rewardsApiResponseSuccess(RewardsActionTypes.REQUEST_APPROVED, id))

		// ✅ Refresh all rewards after success
		yield put({ type: RewardsActionTypes.GET_REWARDS })
	} catch (error: any) {
		yield put(rewardsApiResponseError(RewardsActionTypes.REQUEST_APPROVED, error))
	}
}

/**
 * Reject Reward Request
 */
function* rejectRewardRequest({ payload: id }: any): SagaIterator {
	try {
		// ✅ Dispatch loading before API call
		yield put(rewardsApiResponseLoading(RewardsActionTypes.API_RESPONSE_LOADING))

		yield call(rejectRequestApi, id)
		yield put(rewardsApiResponseSuccess(RewardsActionTypes.REQUEST_REJECTED, id))

		// ✅ Refresh all rewards after success
		yield put({ type: RewardsActionTypes.GET_REWARDS })
	} catch (error: any) {
		yield put(rewardsApiResponseError(RewardsActionTypes.REQUEST_REJECTED, error))
	}
}

/**
 * Watchers
 */
export function* watchGetRewards() {
	yield takeEvery(RewardsActionTypes.GET_REWARDS, getAllRewards)
}

export function* watchRequestApproved() {
	yield takeEvery(RewardsActionTypes.REQUEST_APPROVED, approveRewardRequest)
}

export function* watchRequestRejected() {
	yield takeEvery(RewardsActionTypes.REQUEST_REJECTED, rejectRewardRequest)
}

/**
 * Root Saga
 */
export default function* rewardsSaga() {
	yield all([fork(watchGetRewards), fork(watchRequestApproved), fork(watchRequestRejected)])
}
