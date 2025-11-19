import React, { useEffect, useState } from 'react'
import { Grid } from 'gridjs-react'
import { html } from 'gridjs'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { usePermission } from '@/hooks'
import DismissibleAlert from '../ui/DismissibleAlert'
import { rewardsApiResponseError } from '@/redux/actions'
import { WaitlistActionTypes } from '@/redux/waitlist/constants'

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

const Waitlists = () => {
	const dispatch = useDispatch()
	const { waitlistDatas, error, loading, meta } = useSelector((state: any) => state.Waitlist)

	const canApprove = usePermission('transfer-request:approve')
	const canReject = usePermission('transfer-request:reject')
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(10)

	// 🔹 Fetch users when filters/page change
	const fetchWaitlists = (p = 1) => {
		const params: Record<string, any> = { page: p, per_page: limit }
		dispatch({ type: WaitlistActionTypes.GET_WAITLIST, payload: params })
	}

	// Table data
	const tableData =
		waitlistDatas?.map((waitlist: any) => {
			return [waitlist.first_name + ' ' + waitlist.last_name, waitlist.email, waitlist.country?.name || '-', waitlist.days]
		}) || []

	// 🔹 Pagination Logic
	const totalPages = Math.ceil((meta?.total || 0) / limit)
	const goToPage = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) setPage(newPage)
	}

	useEffect(() => {
		fetchWaitlists(page)
	}, [page, limit, dispatch])

	return (
		<div className="card">
			{loading && (
				<div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-[1000] rounded-lg">
					<div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
				</div>
			)}
			{error && <DismissibleAlert isVisible={error} variant="danger" message={error} onclose={() => dispatch(rewardsApiResponseError(WaitlistActionTypes.API_RESPONSE_ERROR, ''))} />}
			<div className="card-header">
				<h4 className="card-title text-lg font-semibold">Waitlists</h4>
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
						columns={['Name', 'Email', 'Country', 'Days']}
						fixedHeader={true}
					/>
				) : (
					<div className="border rounded-md overflow-hidden">
						{/* ✅ Custom Empty Table with Headers */}
						<table className="min-w-full text-sm text-left border-collapse">
							<thead className="bg-gray-100 text-gray-700 font-semibold">
								<tr>
									<th className="px-4 py-2 border-b">Name</th>
									<th className="px-4 py-2 border-b">Email</th>
									<th className="px-4 py-2 border-b">Country</th>
									<th className="px-4 py-2 border-b">Days</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td colSpan={4} className="text-center py-10 text-gray-500">
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
	)
}

export default Waitlists
