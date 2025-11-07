import { all, fork, put, takeEvery, call } from 'redux-saga/effects'
import { SagaIterator } from '@redux-saga/core'

// helpers
import { APICore, setAuthorization } from '../../helpers/api/apiCore'
import { getrewards as getRewardsApi } from '../../helpers/api/rewards'

// actions
import { rewardsApiResponseSuccess, rewardsApiResponseError } from './actions'

// constants
import { RewardsActionTypes } from './constants'

// instance
const api = new APICore()

/**
 * Get All Rewards Saga
 */
function* getAllRewards(): SagaIterator {
	try {
		const response = yield call(getRewardsApi)
		const rewards = response.data
		// Dispatch success action
		yield put(rewardsApiResponseSuccess(RewardsActionTypes.GET_REWARDS, rewards))
	} catch (error: any) {
		// Dispatch error action
		yield put(rewardsApiResponseError(RewardsActionTypes.GET_REWARDS, error))

		// Reset session on failure (optional)
		api.setLoggedInUser(null)
		setAuthorization(null)
	}
}

/**
 * Watcher Saga
 */
export function* watchGetRewards() {
	yield takeEvery(RewardsActionTypes.GET_REWARDS, getAllRewards)
}

/**
 * Root Rewards Saga
 */
export default function* rewardsSaga() {
	yield all([fork(watchGetRewards)])
}
