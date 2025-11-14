// components
import Statistics from './components/Statistics'
import { PageBreadcrumb } from '../../../components'
import ReactApexChart from 'react-apexcharts'

// dummy data
import { buildGenericApexSeries, constructDualVerified, dailyActiveUserData } from './data'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DashboardActionTypes } from '@/redux/dashboard/constants'

type FilterVal = 'monthly' | 'yearly' | 'weekly' | 'daily'

const dualVerifiedFilter: { label: string; value: FilterVal }[] = [
	{ label: 'Y', value: 'yearly' },
	{ label: 'M', value: 'monthly' },
	{ label: 'W', value: 'weekly' },
	{ label: 'D', value: 'daily' },
]

const Ecommerce = () => {
	const dispatch = useDispatch()
	const { verifiedNotVerifiedUsers, totalActiveUsers } = useSelector((state: any) => state.Dashboard)
	const [userVerifiedFilter, setUserVerifiedFilter] = useState<FilterVal>('monthly')

	const onChangeVerifiedUser = (val: FilterVal) => {
		setUserVerifiedFilter(val)
	}
	const [topActiveUsersFilter, setTopActiveUsersFilter] = useState<FilterVal>('monthly')

	const onChangeTopActiveUser = (val: FilterVal) => {
		setTopActiveUsersFilter(val)
	}
	useEffect(() => {
		dispatch({ type: DashboardActionTypes.GET_TOTAL_ACTIVE_USERS, payload: {} })
		dispatch({ type: DashboardActionTypes.GET_REGISTERED_USERS, payload: {} })
		dispatch({ type: DashboardActionTypes.GET_NEW_SIGNUP_USERS, payload: { filter: 'daily' } })
		dispatch({ type: DashboardActionTypes.GET_NEW_SIGNUP_USERS_NOT_ONBOARDING, payload: { type: 'not_on_boarded' } })
		dispatch({ type: DashboardActionTypes.GET_VERIFIED_NOT_VERIFIED_USERS, payload: { filter: userVerifiedFilter } })
		dispatch({ type: DashboardActionTypes.GET_DAILY_ACTIVE_USERS, payload: {} })
	}, [dispatch])

	useEffect(() => {
		dispatch({ type: DashboardActionTypes.GET_VERIFIED_NOT_VERIFIED_USERS, payload: { filter: userVerifiedFilter } })
	}, [userVerifiedFilter])
	useEffect(() => {
		dispatch({ type: DashboardActionTypes.GET_TOTAL_ACTIVE_USERS, payload: { filter: topActiveUsersFilter } })
	}, [topActiveUsersFilter])

	const dualVerifyChartData = useMemo(() => buildGenericApexSeries(verifiedNotVerifiedUsers, userVerifiedFilter), [verifiedNotVerifiedUsers, userVerifiedFilter])
	const topActiveUsersChartData = useMemo(() => buildGenericApexSeries(totalActiveUsers, topActiveUsersFilter), [totalActiveUsers, topActiveUsersFilter])
	return (
		<>
			<PageBreadcrumb title="Dashboard" subName="Menu" />
			<Statistics />

			<div className="grid lg:grid-cols-1 gap-6 mb-6">
				<div className="card">
					<div className="p-6">
						<h4 className="card-title mb-4">Users Verfied</h4>
						<div className="toolbar apex-toolbar">
							{dualVerifiedFilter.map((item) => (
								<button id={`filter_${item.value}`} key={item.value} className={`btn btn-sm btn-light ${item.value === userVerifiedFilter ? 'active' : ''}`} onClick={() => onChangeVerifiedUser(item.value)}>
									{item.label}
								</button>
							))}
						</div>
						<div dir="ltr">{dualVerifyChartData && <ReactApexChart className="apex-charts" options={dualVerifyChartData} height={380} series={dualVerifyChartData?.series} type="area" />}</div>
					</div>
				</div>
				<div className="card">
					<div className="p-6">
						<h4 className="card-title mb-4">Top Active Users</h4>
						<div className="toolbar apex-toolbar">
							{dualVerifiedFilter.map((item) => (
								<button id={`filter_${item.value}`} key={item.value} className={`btn btn-sm btn-light ${item.value === topActiveUsersFilter ? 'active' : ''}`} onClick={() => onChangeTopActiveUser(item.value)}>
									{item.label}
								</button>
							))}
						</div>
						<div dir="ltr">{topActiveUsersChartData && <ReactApexChart className="apex-charts" options={topActiveUsersChartData} height={380} series={topActiveUsersChartData?.series} type="area" />}</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Ecommerce
