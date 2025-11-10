import { all, fork, put, takeEvery, call } from 'redux-saga/effects'
import { SagaIterator } from '@redux-saga/core'

// apicore
import { APICore, setAuthorization } from '../../helpers/api/apiCore'

// helpers
import { login as loginApi, logout as logoutApi, signup as signupApi, forgotPassword as forgotPasswordApi, me as meApi } from '../../helpers/api/auth'

// actions
import { authApiResponseSuccess, authApiResponseError } from './actions'

// constants
import { AuthActionTypes } from './constants'
import { getAuthSession } from '@/utils/storage'

interface UserData {
	payload: {
		username: string
		password: string
		fullname: string
		email: string
	}
	type: string
}

const api = new APICore()

/**
 * Login the user
 * @param {*} payload - username and password
 */

function* login({ payload: { username, password } }: UserData): SagaIterator {
	try {
		const response = yield call(loginApi, { username, password })
		const user = response.data
		// NOTE - You can change this according to response format from your api
		api.setLoggedInUser(user)
		setAuthorization(user['token'])
		// 3️⃣ Call another API (e.g., fetch user profile)
		const profileResponse = yield call(meApi)
		const profile = profileResponse.data
		// console.log
		const mergedUser = { ...user, ...profile }

		yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, mergedUser))
	} catch (error: any) {
		yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error))
		api.setLoggedInUser(null)
		setAuthorization(null)
	}
}

// ✅ REFRESH FLOW (runs on every app load / refresh)
export function* loadProfileOnRefresh(): SagaIterator {
	try {
		const savedUser = getAuthSession() // from localStorage
		if (savedUser?.token) {
			setAuthorization(savedUser.token)

			// always call API to get latest data
			const profileResponse = yield call(meApi)
			const profile = profileResponse.data

			const mergedUser = { ...savedUser, ...profile }

			yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, mergedUser))
		}
	} catch (error: any) {
		yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error))
		api.setLoggedInUser(null)
		setAuthorization(null)
	}
}

/**
 * Logout the user
 */
function* logout(): SagaIterator {
	try {
		yield call(logoutApi)
		api.setLoggedInUser(null)
		setAuthorization(null)
		yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}))
	} catch (error: any) {
		yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error))
	}
}

function* signup({ payload: { fullname, email, password } }: UserData): SagaIterator {
	try {
		const response = yield call(signupApi, { fullname, email, password })
		const user = response.data
		api.setLoggedInUser(user)
		setAuthorization(user['token'])
		yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, user))
	} catch (error: any) {
		yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error))
		api.setLoggedInUser(null)
		setAuthorization(null)
	}
}

function* forgotPassword({ payload: { username } }: UserData): SagaIterator {
	try {
		const response = yield call(forgotPasswordApi, { username })
		yield put(authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD, response.data))
	} catch (error: any) {
		yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD, error))
	}
}
export function* watchLoginUser() {
	yield takeEvery(AuthActionTypes.LOGIN_USER, login)
}

export function* watchLogout() {
	yield takeEvery(AuthActionTypes.LOGOUT_USER, logout)
}

export function* watchSignup(): any {
	yield takeEvery(AuthActionTypes.SIGNUP_USER, signup)
}

export function* watchForgotPassword(): any {
	yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, forgotPassword)
}

function* authSaga() {
	yield all([takeEvery(AuthActionTypes.LOGIN_USER, login), fork(loadProfileOnRefresh), fork(watchLoginUser), fork(watchLogout), fork(watchSignup), fork(watchForgotPassword)])
}

export default authSaga
