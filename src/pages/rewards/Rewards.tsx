import React, { useEffect } from 'react'
import { Grid } from 'gridjs-react'
import { html } from 'gridjs'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { RewardsActionTypes } from '@/redux/rewards/constants'
import { usePermission } from '@/hooks'
import DismissibleAlert from '../ui/DismissibleAlert'
import { rewardsApiResponseError } from '@/redux/actions'

const STATUS = {
	PENDING: 'pending',
	ACTIVE: 'active',
	REFUNDED: 'refunded',
	ROLLBACK: 'rollback',
	WITHDRAW: 'withdraw',
	PENDING_APPROVAL: 'pending_approval',
}

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
	const { allRewards, error, loading } = useSelector((state: any) => state.Rewards)

	const canApprove = usePermission('transfer-request:approve')
	const canReject = usePermission('transfer-request:reject')

	useEffect(() => {
		dispatch({ type: RewardsActionTypes.GET_REWARDS })
	}, [dispatch])

	const handleAction = (id: string, action: 'approve' | 'reject') => {
		if (action === 'approve') {
			dispatch({ type: RewardsActionTypes.REQUEST_APPROVED, payload: id })
		} else {
			dispatch({ type: RewardsActionTypes.REQUEST_REJECTED, payload: id })
		}
	}

	// ✅ Register global functions for GridJS
	useEffect(() => {
		;(window as any).handleApprove = (id: string) => handleAction(id, 'approve')
		;(window as any).handleReject = (id: string) => handleAction(id, 'reject')
	}, [handleAction])

	const tableData =
		allRewards?.map((reward: any) => {
			const date = reward.meta.details ? (reward.meta.details.transaction_category === 'hotel' ? `${moment(reward.meta.details.start_date).format('DD MMM YYYY')} - ${moment(reward.meta.details.end_date).format('DD MMM YYYY')}` : moment(reward.meta.details.date_of_action).format('DD MMM YYYY')) : ''

			return [
				'',
				{
					id: reward.uuid,
					booking_code: reward.booking_code,
					name: reward.meta.details.name,
					date,
				},
				`$${reward.amount ? reward.amount / 100 : 0}`,
				reward?.coins / 100 || 0,
				reward.status,
				reward.uuid,
			]
		}) || []

	return (
		<div className="card">
			{loading && (
				<div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
					<div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
				</div>
			)}
			{error && <DismissibleAlert isVisible={error} variant="danger" message={error} onclose={() => dispatch(rewardsApiResponseError(RewardsActionTypes.REQUEST_APPROVED, ''))} />}
			<div className="card-header">
				<h4 className="card-title text-lg font-semibold">Rewards</h4>
			</div>

			<div className="p-6">
				<Grid
					search={true}
					sort={true}
					resizable={true}
					data={tableData}
					style={{
						th: {
							backgroundColor: 'rgba(0, 0, 0, 0.05)',
							fontWeight: '600',
						},
					}}
					columns={[
						'User Details',
						{
							name: 'Booking',
							formatter: (cell: any) => {
								const bookingCode = cell?.booking_code || ''
								const name = cell?.name || ''
								const date = cell?.date || ''

								return html(`
                  <div class="flex flex-col">
                    <span class="text-sm font-semibold text-slate-800 dark:text-slate-200">${name}</span>
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
						{
							name: 'Actions',
							//@ts-ignore
							formatter: (cell: any, row: any) => {
								const rewardId = cell || ''

								// ✅ Conditional rendering for permissions
								const approveBtn = canApprove
									? `<button onClick="window.handleApprove('${rewardId}')"
                      class="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-3 py-1.5 rounded-full transition">
                      <i class='ri-check-line text-sm'></i> Approve
                    </button>`
									: ''

								const rejectBtn = canReject
									? `<button onClick="window.handleReject('${rewardId}')"
                      class="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-3 py-1.5 rounded-full transition">
                      <i class='ri-close-line text-sm'></i> Reject
                    </button>`
									: ''

								return html(`
                  <div class="flex items-center gap-2">
                    ${approveBtn}
                    ${rejectBtn}
                  </div>
                `)
							},
						},
					]}
					pagination={{ enabled: true, limit: 10 }}
					fixedHeader={true}
				/>
			</div>
		</div>
	)
}

export default Rewards
