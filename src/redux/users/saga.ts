import { all, fork, put, takeEvery, call } from 'redux-saga/effects'
import { SagaIterator } from '@redux-saga/core'

// helpers
import { APICore, setAuthorization } from '../../helpers/api/apiCore'
import { getusers as getUsersApi } from '../../helpers/api/users'

// actions
import { usersApiResponseSuccess, usersApiResponseError } from './actions'

// constants
import { UsersActionTypes } from './constants'

// instance
const api = new APICore()

/**
 * Get All Users Saga
 */
function* getAllUsers(): SagaIterator {
	try {
		const response = yield call(getUsersApi)
		const users = response.data
		// Dispatch success action
		yield put(usersApiResponseSuccess(UsersActionTypes.GET_USERS, users))
	} catch (error: any) {
		// Dispatch error action
		yield put(usersApiResponseError(UsersActionTypes.GET_USERS, error))

		// Reset session on failure (optional)
		api.setLoggedInUser(null)
		setAuthorization(null)
	}
}

/**
 * Watcher Saga
 */
export function* watchGetUsers() {
	yield takeEvery(UsersActionTypes.GET_USERS, getAllUsers)
}

/**
 * Root Users Saga
 */
export default function* usersSaga() {
	yield all([fork(watchGetUsers)])
}
