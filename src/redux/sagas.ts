import { all } from 'redux-saga/effects'

import authSaga from './auth/saga'
import usersSaga from './users/saga'
import rewardsSaga from './rewards/saga'
import countriesSaga from './countries/saga'

export default function* rootSaga() {
	yield all([authSaga(), usersSaga(), rewardsSaga(), countriesSaga()])
}
