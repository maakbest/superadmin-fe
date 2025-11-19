import React, { useEffect, useState } from 'react'
import { Grid } from 'gridjs-react'
import { html } from 'gridjs'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { RewardsActionTypes } from '@/redux/rewards/constants'
import { usePermission } from '@/hooks'
import DismissibleAlert from '../ui/DismissibleAlert'
import { rewardsApiResponseError } from '@/redux/actions'
import { Drawer } from '@/components'
import RewardTimeline from './RewardTimeline'

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
	const { allRewards, timelineData, error, loading, meta } = useSelector((state: any) => state.Rewards)

	const canApprove = usePermission('transfer-request:approve')
	const canReject = usePermission('transfer-request:reject')
	const [hidtoryId, setHistoryId] = useState<string | null>(null)
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(10)

	const handleAction = (id: string, action: 'approve' | 'reject') => {
		if (action === 'approve') {
			dispatch({ type: RewardsActionTypes.REQUEST_APPROVED, payload: id })
		} else {
			dispatch({ type: RewardsActionTypes.REQUEST_REJECTED, payload: id })
		}
	}

	// 🔹 Fetch users when filters/page change
	const fetchUsers = (p = 1) => {
		const params: Record<string, any> = { page: p, per_page: limit }
		dispatch({ type: RewardsActionTypes.GET_REWARDS, payload: params })
	}

	// Update hsitory id
	const onClickHisotry = (id: string | null) => setHistoryId(id)

	// Table data
	const tableData =
		allRewards?.map((reward: any) => {
			const date = reward.meta.details ? (reward.meta.details.transaction_category === 'hotel' ? `${moment(reward.meta.details.start_date).format('DD MMM YYYY')} - ${moment(reward.meta.details.end_date).format('DD MMM YYYY')}` : moment(reward.meta.details.date_of_action).format('DD MMM YYYY')) : ''

			return [
				reward.user ? { ...reward.user, rewardUuid: reward.uuid } : reward.user,
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

	// 🔹 Pagination Logic
	const totalPages = Math.ceil((meta?.total || 0) / limit)
	const goToPage = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) setPage(newPage)
	}

	useEffect(() => {
		fetchUsers(page)
	}, [page, limit, dispatch])

	// ✅ Register global functions for GridJS
	useEffect(() => {
		;(window as any).handleApprove = (id: string) => handleAction(id, 'approve')
		;(window as any).handleReject = (id: string) => handleAction(id, 'reject')
	}, [handleAction])

	useEffect(() => {
		;(window as any).onClickHisotry = (id: string) => onClickHisotry(id)
	}, [onClickHisotry])

	useEffect(() => {
		if (hidtoryId) {
			dispatch({ type: RewardsActionTypes.GET_REWARDS_TIMELINE, payload: hidtoryId })
		}
	}, [hidtoryId])

	return (
		<>
			<Drawer open={Boolean(hidtoryId)} onClose={() => onClickHisotry(null)} side={'right'} width={'60%'}>
				<RewardTimeline data={timelineData} onClose={() => onClickHisotry(null)} />
			</Drawer>
			<div className="card">
				{loading && (
					<div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-[1000] rounded-lg">
						<div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
					</div>
				)}
				{error && <DismissibleAlert isVisible={error} variant="danger" message={error} onclose={() => dispatch(rewardsApiResponseError(RewardsActionTypes.REQUEST_APPROVED, ''))} />}
				<div className="card-header">
					<h4 className="card-title text-lg font-semibold">Rewards</h4>
				</div>

				<div className="p-6">
					{tableData.length > 0 ? (
						<Grid
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
								{
									name: 'User Details',
									formatter: (cell: any) => {
										if (!cell)
											return html(`
											<div class="flex flex-col">
												<span class="text-sm font-semibold text-slate-800 dark:text-slate-200">-</span>
											</div>
											`)

										const fullname = cell.first_name + '' + cell.last_name
										const email = cell?.email || ''

										return html(`
									<div class="flex flex-col">
										<span class="text-sm font-semibold text-slate-800 dark:text-slate-200">${fullname}</span>
										<span class="text-xs text-slate-500">${email}</span>

										<div class="flex items-center gap-2 mt-1">
										 <span class="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"  onclick="window.onClickHisotry('${cell.rewardUuid}')">View History</span>
										</div>
									</div>
									`)
									},
								},
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
							// pagination={{ enabled: true, limit: 10 }}
							fixedHeader={true}
						/>
					) : (
						<div className="border rounded-md overflow-hidden">
							{/* ✅ Custom Empty Table with Headers */}
							<table className="min-w-full text-sm text-left border-collapse">
								<thead className="bg-gray-100 text-gray-700 font-semibold">
									<tr>
										<th className="px-4 py-2 border-b">User Name</th>
										<th className="px-4 py-2 border-b">Booking</th>
										<th className="px-4 py-2 border-b">Spends</th>
										<th className="px-4 py-2 border-b">Coins</th>
										<th className="px-4 py-2 border-b">Status</th>
										<th className="px-4 py-2 border-b">Actions</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td colSpan={6} className="text-center py-10 text-gray-500">
											<div className="flex flex-col items-center justify-center">
												{/* Optional icon or illustration */}
												<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
													<path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
												</svg>
												<span className="text-gray-600 font-medium">No records found</span>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					)}
					{/* 🔹 Custom Pagination */}
					<div className="flex justify-between items-center mt-4">
						<div className="text-sm text-gray-600">
							Showing page {page} of {totalPages || 1}
						</div>

						<div className="flex gap-2 items-center">
							<button onClick={() => goToPage(page - 1)} disabled={page === 1} className="px-3 py-1 border rounded disabled:opacity-50">
								Prev
							</button>

							{[...Array(totalPages)].map((_, i) => (
								<button key={i} onClick={() => goToPage(i + 1)} className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}>
									{i + 1}
								</button>
							))}

							<button onClick={() => goToPage(page + 1)} disabled={page === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">
								Next
							</button>
						</div>

						{/* Optional rows per page selector */}
						<select value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="border border-gray-300 rounded px-2 py-1 text-sm w-[100px]">
							{[10, 20, 50, 100].map((n) => (
								<option key={n} value={n}>
									{n} / page
								</option>
							))}
						</select>
					</div>
				</div>
			</div>
		</>
	)
}

export default Rewards
