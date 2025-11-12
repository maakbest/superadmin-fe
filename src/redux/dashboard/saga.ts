import { all, fork, put, takeEvery, call } from 'redux-saga/effects'
import { SagaIterator } from '@redux-saga/core'

// helpers
import { APICore } from '../../helpers/api/apiCore'
import { getdailyactiveusers as getDailyActiveUsersApi, getverifiednotverifiedusers as getVerifiedNotVerifiedUsersApi, gettotalactive as getTotalActiveApi, getregisteredusers as getRegisteredUsersApi } from '../../helpers/api'

// actions
import { dashboardApiResponseSuccess, dashboardApiResponseError, dashboardApiResponseLoading } from './actions'

// constants
import { DashboardActionTypes } from './constants'

// instance
const api = new APICore()

/**
 * Get All Dashboard Saga
 */
function* getDailyActiveUsers(params: any): SagaIterator {
	try {
		// ✅ Dispatch loading before API call
		yield put(dashboardApiResponseLoading(DashboardActionTypes.API_RESPONSE_LOADING))
		const response = yield call(getDailyActiveUsersApi, params.payload)
		const dashboard = response.data
		// Dispatch success action
		yield put(dashboardApiResponseSuccess(DashboardActionTypes.GET_DAILY_ACTIVE_USERS, dashboard))
	} catch (error: any) {
		// Dispatch error action
		yield put(dashboardApiResponseError(DashboardActionTypes.GET_DAILY_ACTIVE_USERS, error))
	}
}

function* getVerifiedNotVerifiedUsers(params: any): SagaIterator {
	try {
		// ✅ Dispatch loading before API call
		yield put(dashboardApiResponseLoading(DashboardActionTypes.API_RESPONSE_LOADING))
		const response = yield call(getVerifiedNotVerifiedUsersApi, params.payload)
		const dashboard = response.data
		// Dispatch success action
		yield put(dashboardApiResponseSuccess(DashboardActionTypes.GET_VERIFIED_NOT_VERIFIED_USERS, dashboard))
	} catch (error: any) {
		// Dispatch error action
		yield put(dashboardApiResponseError(DashboardActionTypes.GET_VERIFIED_NOT_VERIFIED_USERS, error))
	}
}

function* getTotalActive(params: any): SagaIterator {
	try {
		// ✅ Dispatch loading before API call
		yield put(dashboardApiResponseLoading(DashboardActionTypes.API_RESPONSE_LOADING))
		const response = yield call(getTotalActiveApi, params.payload)
		const dashboard = response.data
		// Dispatch success action
		yield put(dashboardApiResponseSuccess(DashboardActionTypes.GET_TOTAL_ACTIVE_USERS, dashboard))
	} catch (error: any) {
		// Dispatch error action
		yield put(dashboardApiResponseError(DashboardActionTypes.GET_TOTAL_ACTIVE_USERS, error))
	}
}

function* getRegisteredUsers(params: any): SagaIterator {
	try {
		// ✅ Dispatch loading before API call
		yield put(dashboardApiResponseLoading(DashboardActionTypes.API_RESPONSE_LOADING))
		const response = yield call(getRegisteredUsersApi, params.payload)
		const dashboard = response.data
		// Dispatch success action
		yield put(dashboardApiResponseSuccess(DashboardActionTypes.GET_REGISTERED_USERS, dashboard))
	} catch (error: any) {
		// Dispatch error action
		yield put(dashboardApiResponseError(DashboardActionTypes.GET_REGISTERED_USERS, error))
	}
}

/**
 * Watcher Saga
 */

export function* watchGetDailyActiveUsers() {
	yield takeEvery(DashboardActionTypes.GET_DAILY_ACTIVE_USERS, getDailyActiveUsers)
}

export function* watchGetVerifiedNotVerifiedUsers() {
	yield takeEvery(DashboardActionTypes.GET_VERIFIED_NOT_VERIFIED_USERS, getVerifiedNotVerifiedUsers)
}

export function* watchGetTotalActive() {
	yield takeEvery(DashboardActionTypes.GET_TOTAL_ACTIVE_USERS, getTotalActive)
}

export function* watchGetRegisteredUsers() {
	yield takeEvery(DashboardActionTypes.GET_REGISTERED_USERS, getRegisteredUsers)
}

/**
 * Root Dashboard Saga
 */

export default function* dashboardSaga() {
	yield all([fork(watchGetDailyActiveUsers), fork(watchGetVerifiedNotVerifiedUsers), fork(watchGetTotalActive), fork(watchGetRegisteredUsers)])
}
