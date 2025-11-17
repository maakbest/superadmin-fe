import { all, fork, put, takeEvery, call } from 'redux-saga/effects'
import { SagaIterator } from '@redux-saga/core'

// helpers
import { APICore, setAuthorization } from '../../helpers/api/apiCore'
import { getcountries as getCountriesApi } from '../../helpers/api/countries'

// actions
import { countriesApiResponseSuccess, countriesApiResponseError, countriesApiResponseLoading } from './actions'

// constants
import { CountriesActionTypes } from './constants'
import { getAuthSession } from '@/utils/storage'

const api = new APICore()

/**
 * Get All Countriess Saga
 */
function* getAllCountriess(): SagaIterator {
	try {
		// ✅ Dispatch loading before API call
		yield put(countriesApiResponseLoading(CountriesActionTypes.API_RESPONSE_LOADING))

		const response = yield call(getCountriesApi)
		const countries = response.data
		// Dispatch success action
		yield put(countriesApiResponseSuccess(CountriesActionTypes.GET_COUNTRIES, countries))
	} catch (error: any) {
		// Dispatch error action
		yield put(countriesApiResponseError(CountriesActionTypes.GET_COUNTRIES, error))
	}
}

/**
 * Watcher Saga
 */
export function* watchGetCountriess() {
	yield takeEvery(CountriesActionTypes.GET_COUNTRIES, getAllCountriess)
}

/**
 * Root Countriess Saga
 */
export default function* countriesSaga() {
	yield all([fork(watchGetCountriess)])
}
