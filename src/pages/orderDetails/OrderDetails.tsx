import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BookingDetailsActionTypes } from '@/redux/bookingdetails/constants'
import { formatCurrency } from '@/utils/currency'
import { bookingDetailsApiResponseError } from '@/redux/actions'
import DismissibleAlert from '../ui/DismissibleAlert'
import BookingPriceComparison from './BookingPriceComparison'

const OrderDetails = () => {
	const dispatch = useDispatch()
	const { allBookings, amandusDetails, bestDetails, error, loading, meta } = useSelector((state: any) => state.BookingDetails)
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(10)
	const [bookingId, setBookingId] = useState<string | null>(null)
	// 🔹 Fetch users when filters/page change
	const fetchUsers = (p = 1) => {
		const params: Record<string, any> = { page: p, per_page: limit }
		dispatch({ type: BookingDetailsActionTypes.GET_BOOKING_DETAILS, payload: params })
	}

	// 🔹 Pagination Logic
	const totalPages = Math.ceil((meta?.total || 0) / limit)
	const goToPage = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) setPage(newPage)
	}

	useEffect(() => {
		fetchUsers(page)
	}, [page, limit, dispatch])

	const onClickRow = (bookingId: string) => {
		if (!bookingId) return
		setBookingId(bookingId)
		dispatch({ type: BookingDetailsActionTypes.GET_AMANDUS_DETAILS, payload: bookingId })
		dispatch({ type: BookingDetailsActionTypes.GET_BEST_DETAILS, payload: bookingId })
	}

	if (bookingId && amandusDetails && bestDetails) {
		return (
			<div>
				{loading && (
					<div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-[1000] rounded-lg">
						<div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
					</div>
				)}
				<button
					onClick={() => setBookingId(null)}
					className="
        group inline-flex items-center gap-2 mb-2
        rounded-lg border border-gray-200 bg-white
        px-4 py-2 text-sm font-medium text-gray-700
        shadow-sm transition-all
        hover:border-gray-300 hover:bg-gray-50
        hover:shadow-md
        active:scale-[0.98]
        focus:outline-none focus:ring-2 focus:ring-blue-500/40
      "
				>
					<i className="ri-arrow-left-line text-lg"></i>

					<span>Back</span>
				</button>
				<BookingPriceComparison amadeus={amandusDetails} best={bestDetails} />
			</div>
		)
	}

	return (
		<div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
			{loading && (
				<div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-[1000] rounded-lg">
					<div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
				</div>
			)}
			{error && <DismissibleAlert isVisible={error} variant="danger" message={error} onclose={() => dispatch(bookingDetailsApiResponseError(BookingDetailsActionTypes.API_RESPONSE_ERROR, ''))} />}
			{/* Header */}
			<div className="grid grid-cols-5 border-b bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-600">
				<div className="px-4 py-3">PNR No</div>
				<div className="px-4 py-3">User Details</div>
				<div className="px-4 py-3">Hotel Details</div>
				<div className="px-4 py-3">Booking Details</div>
				<div className="px-4 py-3">Pricing Details</div>
			</div>

			{/* Rows */}
			<div className="divide-y divide-gray-100 text-sm">
				{allBookings.length === 0 && <div className="px-4 py-6 text-center text-gray-500">No bookings found</div>}

				{allBookings.map((row: any, index: number) => {
					const order = row?.order

					return (
						<div key={index} className="grid grid-cols-5 items-start transition-colors hover:bg-gray-50 cursor-pointer" onClick={() => onClickRow(row?.uuid)}>
							{/* PNR */}
							<div className="px-4 py-3">
								<div className="font-semibold text-gray-900 tracking-wide">{order?.pnr || '—'}</div>
							</div>

							{/* User Details */}
							<div className="px-4 py-3">
								<div className="font-medium text-gray-900">
									{row?.user?.first_name} {row?.user?.last_name}
								</div>
								<div className="mt-0.5 text-xs text-gray-500 truncate">{row?.user?.email}</div>
							</div>

							{/* Hotel Details */}
							<div className="px-4 py-3">
								<div className="font-medium text-gray-900 leading-snug capitalize">{order?.hotel?.name?.toLowerCase() || '—'}</div>
							</div>

							{/* Booking Details */}
							<div className="px-4 py-3">
								<div className="font-medium text-gray-900">{order?.booking_details?.reservation_room_type || '—'}</div>
								<div className="mt-0.5 text-xs text-gray-500">
									{order?.booking_details?.trip_start} → {order?.booking_details?.trip_end}
								</div>
							</div>

							{/* Room Basic Details */}
							<div className="px-4 py-3">
								<div className="mt-0.5 text-xs text-gray-500">AMA</div>
								<div className="mt-0.5 font-semibold text-gray-900">{formatCurrency(order?.room?.price?.total || 0, order?.room?.pricing?.free?.currency)}</div>

								<div className="mt-0.5 text-xs text-gray-500">BEST</div>
								<div className="mt-0.5 font-semibold text-gray-900">{formatCurrency(order?.room?.pricing?.paid || 0, order?.room?.pricing?.free?.currency)}</div>
							</div>
						</div>
					)
				})}
			</div>

			{/* Pagination */}
			<div className="flex items-center justify-between border-t bg-gray-50 px-4 py-3">
				<div className="text-sm text-gray-600">
					Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages || 1}</span>
				</div>

				<div className="flex items-center gap-1">
					<button onClick={() => goToPage(page - 1)} disabled={page === 1} className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-40 hover:bg-gray-100">
						Prev
					</button>

					{[...Array(totalPages)].map((_, i) => (
						<button key={i} onClick={() => goToPage(i + 1)} className={`rounded-md px-3 py-1.5 text-sm ${page === i + 1 ? 'bg-blue-600 text-white' : 'border hover:bg-gray-100'}`}>
							{i + 1}
						</button>
					))}

					<button onClick={() => goToPage(page + 1)} disabled={page === totalPages} className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-40 hover:bg-gray-100">
						Next
					</button>
				</div>

				<select value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="rounded-md border border-gray-300 px-2 py-1.5 text-sm w-[100px]">
					{[10, 20, 50, 100].map((n) => (
						<option key={n} value={n}>
							{n} / page
						</option>
					))}
				</select>
			</div>
		</div>
	)
}

export default OrderDetails
