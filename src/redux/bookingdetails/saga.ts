import { all, fork, put, takeEvery, call } from 'redux-saga/effects'
import { SagaIterator } from '@redux-saga/core'
import { bookingDetailsApiResponseSuccess, bookingDetailsApiResponseError, bookingDetailsApiResponseLoading } from './actions'
import { getallbookings, getamandusdetails, getbestdetails } from '../../helpers/api/bookingDetails'
import { BookingDetailsActionTypes } from './constants'

/**
 * Get All Bookings Saga
 */
function* getAllBookings(params: any): SagaIterator {
	try {
		// ✅ Dispatch loading before API call
		yield put(bookingDetailsApiResponseLoading(BookingDetailsActionTypes.API_RESPONSE_LOADING))

		const response = yield call(getallbookings, params.payload)
		const rewards = response.data
		yield put(bookingDetailsApiResponseSuccess(BookingDetailsActionTypes.GET_BOOKING_DETAILS, rewards))
	} catch (error: any) {
		yield put(bookingDetailsApiResponseError(BookingDetailsActionTypes.GET_BOOKING_DETAILS, error))
	}
}

/**
 * Get All Rewards Timeline Saga
 */

function* getAmandusDetailsApi({ payload: id }: any): SagaIterator {
	if (!id) return
	try {
		// ✅ Dispatch loading before API call
		yield put(bookingDetailsApiResponseLoading(BookingDetailsActionTypes.API_RESPONSE_LOADING))

		const response = yield call(getamandusdetails, id)
		const res = response.data
		yield put(bookingDetailsApiResponseSuccess(BookingDetailsActionTypes.GET_AMANDUS_DETAILS, res))
	} catch (error: any) {
		yield put(bookingDetailsApiResponseError(BookingDetailsActionTypes.GET_AMANDUS_DETAILS, error))
	}
}

/**
 * Approve Reward Request
 */
function* getBestDetailsApi({ payload: id }: any): SagaIterator {
	if (!id) return

	try {
		// ✅ Dispatch loading before API call
		yield put(bookingDetailsApiResponseLoading(BookingDetailsActionTypes.API_RESPONSE_LOADING))

		const response = yield call(getbestdetails, id)
		const res = response.data
		yield put(bookingDetailsApiResponseSuccess(BookingDetailsActionTypes.GET_BEST_DETAILS, res))

		// ✅ Refresh all res after success
		yield put({ type: BookingDetailsActionTypes.GET_BEST_DETAILS })
	} catch (error: any) {
		yield put(bookingDetailsApiResponseError(BookingDetailsActionTypes.GET_BEST_DETAILS, error))
	}
}

/**
 * Watchers
 */
export function* watchGetBookings() {
	yield takeEvery(BookingDetailsActionTypes.GET_BOOKING_DETAILS, getAllBookings)
}

export function* watchGetAmandusDetails() {
	yield takeEvery(BookingDetailsActionTypes.GET_AMANDUS_DETAILS, getAmandusDetailsApi)
}

export function* watchGetBestDetails() {
	yield takeEvery(BookingDetailsActionTypes.GET_BEST_DETAILS, getBestDetailsApi)
}

/**
 * Root Saga
 */
export default function* rewardsSaga() {
	yield all([fork(watchGetBookings), fork(watchGetAmandusDetails), fork(watchGetBestDetails)])
}
