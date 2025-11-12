// components
import Statistics from './components/Statistics'
import { PageBreadcrumb } from '../../../components'
import ReactApexChart from 'react-apexcharts'

// dummy data
import { constructDualVerified } from './data'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DashboardActionTypes } from '@/redux/dashboard/constants'

const Ecommerce = () => {
	const dispatch = useDispatch()
	const { verifiedNotVerifiedUsers, dailyActiveUsers, error, loading, meta } = useSelector((state: any) => state.Dashboard)

	useEffect(() => {
		dispatch({ type: DashboardActionTypes.GET_TOTAL_ACTIVE_USERS, payload: {} })
		dispatch({ type: DashboardActionTypes.GET_REGISTERED_USERS, payload: {} })
		dispatch({ type: DashboardActionTypes.GET_VERIFIED_NOT_VERIFIED_USERS, payload: {} })
		dispatch({ type: DashboardActionTypes.GET_DAILY_ACTIVE_USERS, payload: {} })
	}, [dispatch])

	const spilineAreaApexOpts = useMemo(() => constructDualVerified(verifiedNotVerifiedUsers), [verifiedNotVerifiedUsers])

	return (
		<>
			<PageBreadcrumb title="Dashboard" subName="Menu" />
			<Statistics />

			<div className="grid lg:grid-cols-2 gap-6 mb-6">
				<div className="card">
					<div className="p-6">
						<h4 className="card-title mb-4">Users Verfied</h4>
						<div dir="ltr">
							<ReactApexChart className="apex-charts" options={spilineAreaApexOpts} height={380} series={spilineAreaApexOpts.series} type="area" />
						</div>
					</div>
				</div>
				<div className="card">
					<div className="p-6">
						<h4 className="card-title mb-4">Daily Active Users</h4>
						<div dir="ltr">
							<ReactApexChart className="apex-charts" options={spilineAreaApexOpts} height={380} series={spilineAreaApexOpts.series} type="area" />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Ecommerce
