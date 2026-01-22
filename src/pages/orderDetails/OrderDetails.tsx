import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { getThemeColors } from '../../utils/themeColors'

const OrderDetails = () => {
	const { layoutTheme } = useSelector((state: RootState) => ({
		layoutTheme: state.Layout.layoutTheme,
	}))

	const colors = getThemeColors(layoutTheme)

	return (
		<div className={`overflow-x-auto rounded-xl border ${colors.border} ${colors.background.primary} shadow-sm`}>
			<table className="min-w-full border-collapse text-sm">
				{/* Header */}
				<thead className={`sticky top-0 ${colors.table.headerBg}`}>
					<tr className={`text-left ${colors.text.muted}`}>
						<th className="px-4 py-3 font-semibold">Category</th>
						<th className="px-4 py-3 font-semibold">Field</th>
						<th className="px-4 py-3 font-semibold">AMA Data</th>
						<th className="px-4 py-3 font-semibold">Best Data</th>
					</tr>
				</thead>

				<tbody className={`divide-y ${colors.table.divider}`}>
					{/* Room Price */}
					<tr className={colors.table.headerBg}>
						<td colSpan={4} className={`px-4 py-2 text-sm font-semibold ${colors.text.primary}`}>
							Room Price
						</td>
					</tr>

					{[
						['Room Price', 'Hotel Currency', 'USD', 'USD'],
						['', 'User Currency', 'INR', 'INR'],
						['', 'Room Price', '115', '120'],
						['', 'Tax', '18', '20'],
						['', 'Payable at Hotel', 'Yes', 'Yes'],
						['', 'Offer ID', 'NA', 'AMA123'],
					].map(([category, field, best, ama], i) => (
						<tr key={i} className={colors.table.rowHoverBg}>
							<td className={`px-4 py-2 ${colors.text.secondary}`}>{category}</td>
							<td className={`px-4 py-2 ${colors.text.secondary}`}>{field}</td>
							<td className={`px-4 py-2 font-medium ${colors.text.primary}`}>{best}</td>
							<td className={`px-4 py-2 font-medium ${colors.text.primary}`}>{ama}</td>
						</tr>
					))}

					{/* Refunds */}
					<tr className={colors.table.headerBg}>
						<td colSpan={4} className={`px-4 py-2 font-semibold ${colors.text.primary}`}>
							Refunds
						</td>
					</tr>

					{[
						['Refunds', 'Refundable', 'Yes', 'Yes'],
						['', 'Penalty & Deadline', '1 night till 24h before', 'Same'],
					].map(([category, field, best, ama], i) => (
						<tr key={i} className={colors.table.rowHoverBg}>
							<td className={`px-4 py-2 ${colors.text.secondary}`}>{category}</td>
							<td className={`px-4 py-2 ${colors.text.secondary}`}>{field}</td>
							<td className={`px-4 py-2 ${colors.text.secondary}`}>{best}</td>
							<td className={`px-4 py-2 ${colors.text.secondary}`}>{ama}</td>
						</tr>
					))}

					{/* Identifiers */}
					<tr className={colors.table.headerBg}>
						<td colSpan={4} className={`px-4 py-2 font-semibold ${colors.text.primary}`}>
							Identifiers
						</td>
					</tr>

					{[
						['PNR', 'PNR', 'ABC123', '-'],
						['Best', 'Reservation ID', 'BEST789', '-'],
						['Payment', 'Stripe Payment ID', 'pi_12345', '-'],
					].map(([category, field, best, ama], i) => (
						<tr key={i} className={colors.table.rowHoverBg}>
							<td className={`px-4 py-2 ${colors.text.secondary}`}>{category}</td>
							<td className={`px-4 py-2 ${colors.text.secondary}`}>{field}</td>
							<td className={`px-4 py-2 ${colors.text.secondary}`}>{best}</td>
							<td className={`px-4 py-2 ${colors.text.secondary}`}>{ama}</td>
						</tr>
					))}

					{/* Coins */}
					<tr className={colors.table.headerBg}>
						<td colSpan={4} className={`px-4 py-2 font-semibold ${colors.text.primary}`}>
							Coins
						</td>
					</tr>

					{[
						['Coins', 'Coins Awarded', '200', '-'],
						['', 'Cashback Awarded', '₹300', '-'],
					].map(([category, field, best, ama], i) => (
						<tr key={i} className={colors.table.rowHoverBg}>
							<td className={`px-4 py-2 ${colors.text.secondary}`}>{category}</td>
							<td className={`px-4 py-2 ${colors.text.secondary}`}>{field}</td>
							<td className={`px-4 py-2 ${colors.text.secondary}`}>{best}</td>
							<td className={`px-4 py-2 font-semibold ${colors.variants.success}`}>{ama}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default OrderDetails
