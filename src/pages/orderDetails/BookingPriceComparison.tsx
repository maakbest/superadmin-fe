import React from 'react'

/* ------------------------------------------------------------------ */
/* Utils */
/* ------------------------------------------------------------------ */

const formatValue = (value: any): string => {
	if (value === null || value === undefined || value === '') return '—'
	if (Array.isArray(value)) return `${value.length} item(s)`
	if (typeof value === 'boolean') return value ? 'Yes' : 'No'
	return String(value)
}

const formatCurrency = (amount?: number | string, currency?: string) => {
	if (!amount || !currency) return '—'
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
		maximumFractionDigits: 2,
	}).format(Number(amount))
}

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

type ComparisonProps = {
	amadeus: any
	best: any
}

/* ------------------------------------------------------------------ */
/* Row Component */
/* ------------------------------------------------------------------ */

const ComparisonRow = ({ label, amadeusValue, bestValue }: { label: string; amadeusValue: React.ReactNode; bestValue: React.ReactNode }) => {
	const isDifferent = formatValue(amadeusValue) !== formatValue(bestValue)

	return (
		<div className="grid grid-cols-3 items-start">
			<div className="px-4 py-3 text-sm font-medium text-gray-900">{label}</div>

			<div className={`px-4 py-3 text-sm text-gray-900 ${isDifferent ? 'bg-white' : 'text-gray-900'}`}>{amadeusValue ?? '—'}</div>

			<div className={`px-4 py-3 text-sm text-gray-900 ${isDifferent ? 'bg-white' : 'text-gray-900'}`}>{bestValue ?? '—'}</div>
		</div>
	)
}

/* ------------------------------------------------------------------ */
/* Main Component */
/* ------------------------------------------------------------------ */

const BookingPriceComparison: React.FC<ComparisonProps> = ({ amadeus, best }) => {
	const bestPayAtHotel = best?.room_price?.payable_at_hotel ?? []

	return (
		<div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
			{/* Header */}
			<div className="grid grid-cols-3 bg-gray-50 border-b">
				<div className="px-4 py-3 text-xs font-semibold uppercase text-gray-600">Field</div>
				<div className="px-4 py-3 text-xs font-semibold uppercase text-gray-600">Amadeus</div>
				<div className="px-4 py-3 text-xs font-semibold uppercase text-gray-600">Best</div>
			</div>

			{/* Body */}
			<div className="divide-y divide-gray-200">
				<ComparisonRow label="PNR / Reservation ID" amadeusValue={amadeus?.pnr} bestValue={best?.best_reservation_id} />

				<ComparisonRow label="User Currency" amadeusValue={amadeus?.room_price?.user_currency} bestValue={best?.room_price?.user_currency} />

				<ComparisonRow label="Total Price" amadeusValue={formatCurrency(amadeus?.room_price?.total, amadeus?.room_price?.user_currency)} bestValue={formatCurrency(best?.room_price?.total, best?.room_price?.user_currency)} />

				<ComparisonRow label="Tax" amadeusValue={formatCurrency(amadeus?.room_price?.tax, amadeus?.room_price?.user_currency)} bestValue={formatCurrency(best?.room_price?.tax, best?.room_price?.user_currency)} />

				<ComparisonRow
					label="Payable at Hotel"
					amadeusValue={formatValue(amadeus?.room_price?.payable_at_hotel)}
					bestValue={
						bestPayAtHotel.length ? (
							<div className="space-y-1">
								{bestPayAtHotel.map((item: any, index: number) => (
									<div key={index} className="flex justify-between text-xs">
										<span className="text-gray-600">{item.label}</span>
										<span className="font-medium">{formatCurrency(item.amount, best?.room_price?.user_currency)}</span>
									</div>
								))}
							</div>
						) : (
							'—'
						)
					}
				/>

				<ComparisonRow label="Refundable" amadeusValue={formatValue(amadeus?.refunds?.is_refundable)} bestValue={formatValue(best?.refunds?.is_refundable)} />

				<ComparisonRow label="Refund Penalty" amadeusValue={formatValue(amadeus?.refunds?.refund_penalty)} bestValue={formatValue(best?.refunds?.refund_penalty)} />

				<ComparisonRow label="Coins Awarded" amadeusValue="—" bestValue={<span className="font-semibold">{best?.coins?.coins_awarded ?? '—'}</span>} />

				<ComparisonRow label="Cashback" amadeusValue="—" bestValue={<span className="font-semibold">{best?.coins?.cashback_awarded ?? '—'}</span>} />

				<ComparisonRow label="Payment Reference" amadeusValue={amadeus?.room_price?.offer_id} bestValue={best?.stripe_payment_id} />
			</div>
		</div>
	)
}

export default BookingPriceComparison
