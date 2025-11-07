import React, { useEffect } from 'react'
import { Grid } from 'gridjs-react'
import { html } from 'gridjs'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { RewardsActionTypes } from '@/redux/rewards/constants'

// ✅ Status constants
const STATUS = {
	PENDING: 'pending',
	ACTIVE: 'active',
	REFUNDED: 'refunded',
	ROLLBACK: 'rollback',
	WITHDRAW: 'withdraw',
	PENDING_APPROVAL: 'pending_approval',
}

// ✅ Color map for each status
const statusColorMap: Record<string, string> = {
	[STATUS.PENDING]: 'bg-yellow-500 text-white',
	[STATUS.ACTIVE]: 'bg-green-500 text-white',
	[STATUS.REFUNDED]: 'bg-blue-500 text-white',
	[STATUS.ROLLBACK]: 'bg-orange-500 text-white',
	[STATUS.WITHDRAW]: 'bg-purple-500 text-white',
	[STATUS.PENDING_APPROVAL]: 'bg-amber-500 text-white',
}

const Rewards = () => {
	const dispatch = useDispatch()
	const { allRewards, loading, error } = useSelector((state: any) => state.Rewards)

	useEffect(() => {
		dispatch({ type: RewardsActionTypes.GET_REWARDS })
	}, [dispatch])

	// Prepare safe data
	const tableData =
		allRewards?.map((reward: any) => {
			const date = reward.meta.details ? (reward.meta.details.transaction_category === 'hotel' ? `${moment(reward.meta.details.start_date).format('DD MMM YYYY')} - ${moment(reward.meta.details.end_date).format('DD MMM YYYY')}` : moment(reward.meta.details.date_of_action).format('DD MMM YYYY')) : ''
			return [{ booking_code: reward.booking_code, name: reward.meta.details.name, date: date }, `$${reward.amount ? reward.amount / 100 : 0}`, reward?.coins / 100 || 0, reward.status]
		}) || []

	return (
		<div>
			<div className="card">
				<div className="card-header">
					<div className="flex justify-between items-center">
						<h4 className="card-title">Rewards</h4>
					</div>
				</div>

				<div className="p-6">
					<p className="text-sm text-slate-700 dark:text-slate-400 mb-4">List of registered rewards and their details.</p>

					<Grid
						search={true}
						sort={true}
						data={tableData}
						columns={[
							{
								name: 'Booking',
								formatter: (cell: any) => {
									const bookingCode = cell?.booking_code || '' // Adjust index based on your column order
									const name = cell?.name || ''
									const date = cell?.date || ''

									return html(`
											<div class="flex flex-col">
												<span class="text-sm font-semibold text-slate-800">${name}</span>
												<span class="text-xs text-slate-500">${bookingCode}</span>
												<span class="text-xs text-slate-400">${date}</span>
											</div>
										`)
								},
							},
							'Spends',
							'Coins',
							{
								name: 'Status',
								formatter: (cell: string) => {
									const formatted =
										cell
											?.split('_')
											.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
											.join(' ') || 'Unknown'

									const colorClass = statusColorMap[cell] || 'bg-gray-400 text-white'

									return html(
										`<span class="px-3 py-1 rounded-full text-xs font-medium ${colorClass}">
											${formatted}
										</span>`
									)
								},
							},
						]}
						height="100%"
						fixedHeader={true}
						pagination={{ enabled: true, limit: 10 }}
					/>
				</div>
			</div>
		</div>
	)
}

export default Rewards
