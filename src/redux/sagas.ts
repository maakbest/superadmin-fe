import { all } from 'redux-saga/effects'

import authSaga from './auth/saga'
import usersSaga from './users/saga'
import rewardsSaga from './rewards/saga'
import countriesSaga from './countries/saga'
import dashboardSaga from './dashboard/saga'
import waitlistsSaga from './waitlist/saga'
import bookingDetailsSaga from './bookingdetails/saga'
export default function* rootSaga() {
	yield all([authSaga(), usersSaga(), rewardsSaga(), countriesSaga(), dashboardSaga(), waitlistsSaga(), bookingDetailsSaga()])
}
