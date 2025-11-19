import { all, fork, put, takeEvery, call } from 'redux-saga/effects'
import { SagaIterator } from '@redux-saga/core'
import { APICore } from '../../helpers/api/apiCore'
import { getwaitlist as getWaitlistApi } from '../../helpers/api'
import { waitlistsApiResponseSuccess, waitlistsApiResponseError, waitlistsApiResponseLoading } from './actions'
import { WaitlistActionTypes } from './constants'

const api = new APICore()

/**
 * Get All Rewards Saga
 */
function* getAllWaitlists(params: any): SagaIterator {
	try {
		// ✅ Dispatch loading before API call
		yield put(waitlistsApiResponseLoading(WaitlistActionTypes.API_RESPONSE_LOADING))

		const response = yield call(getWaitlistApi, params.payload)
		const waitlists = response.data
		yield put(waitlistsApiResponseSuccess(WaitlistActionTypes.GET_WAITLIST, waitlists))
	} catch (error: any) {
		yield put(waitlistsApiResponseError(WaitlistActionTypes.GET_WAITLIST, error))
	}
}

/**
 * Watchers
 */
export function* watchGetRewards() {
	yield takeEvery(WaitlistActionTypes.GET_WAITLIST, getAllWaitlists)
}

/**
 * Root Saga
 */
export default function* waitlistsSaga() {
	yield all([fork(watchGetRewards)])
}
