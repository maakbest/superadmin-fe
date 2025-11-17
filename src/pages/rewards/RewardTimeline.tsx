import React from 'react'
import moment from 'moment'
import { formatUSD } from '@/utils/format'

export interface RewardHistoryItem {
	uuid: string
	booking_code: string
	type: 'credit' | 'debit'
	status: string
	activation_date: string
	amount: number
	currency_code: string
	reward_percentage: string
	coin_conversion_rate: string
	coins: number
	coin_balance: number
	transaction_category: string
	meta: {
		note: string
		details: {
			name: string
			amount: number
			currency: string
			end_date: string
			reference: string
			start_date: string
			date_of_action: string
			transaction_category: string
		}
		lock_days: number
		used_plan: string
		activation_date: string
	}
	created_at: string
}

interface Props {
	data: RewardHistoryItem[]
	onClose: () => void
}

const RewardsTimeline: React.FC<Props> = ({ data, onClose }) => {
	return (
		<div className="w-full">
			<div className="flex justify-between items-center mb-3">
				<h2 className="text-lg font-semibold text-slate-800">Rewards History</h2>
				<button
					onClick={onClose}
					className="
							mt-2 mb-2 flex items-center justify-center
							w-10 h-10 rounded-full 
							bg-red-500 text-white 
							hover:bg-red-600 
							transition-all duration-300
							hover:rotate-90
							active:scale-90
							shadow-md hover:shadow-lg
							"
				>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			{data.length === 0 ? (
				<NoTimelineRecords />
			) : (
				<div className="relative">
					<div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-300"></div>

					<div className="space-y-12">
						{data.map((item, index) => {
							const isLeft = index % 2 === 0

							const details = item.meta?.details
							const hotelName = details?.name
							const dates = details?.transaction_category === 'hotel' ? `${moment(details.start_date).format('DD MMM')} - ${moment(details.end_date).format('DD MMM YYYY')}` : moment(details.date_of_action).format('DD MMM YYYY')

							const amountUSD = formatUSD(item.amount / 100)

							return (
								<div key={item.uuid} className={`flex w-full items-center ${isLeft ? 'justify-start' : 'justify-end'}`}>
									<div className={`w-[49%] px-4 py-4 rounded-xl shadow bg-white border ${isLeft ? 'text-left' : 'text-right'}`}>
										<h3 className="font-semibold text-slate-800">{hotelName}</h3>

										<p className="text-xs text-slate-500">{item.booking_code}</p>

										<p className="mt-1 text-xs text-slate-400">{dates}</p>

										<p className="mt-2 text-sm font-semibold text-blue-600">Amount ${amountUSD}</p>
										<p className="mt-1 text-sm font-semibold text-yellow-600">Coins {formatUSD(item.coins / 100)}</p>

										<p className="text-xs text-slate-400 mt-1">{moment(item.created_at).format('DD MMM YYYY, hh:mm A')}</p>
									</div>

									<div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 border-4 border-white rounded-full"></div>
								</div>
							)
						})}
					</div>
				</div>
			)}
		</div>
	)
}

const NoTimelineRecords = () => {
	return (
		<div className="flex flex-col items-center justify-center text-center py-12">
			{/* Faded vertical line like a timeline */}
			<div className="w-px h-10 bg-gray-300/40 mb-6"></div>

			{/* Icon */}
			<div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center shadow-inner">
				<svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75L14.25 14.25M14.25 9.75L9.75 14.25M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z" />
				</svg>
			</div>

			{/* Text */}
			<h3 className="text-lg font-semibold text-gray-700 mt-4">No Records Found</h3>
			<p className="text-gray-500 mt-1 text-sm max-w-xs">You don’t have any reward history yet. When you make bookings, they will appear here.</p>

			{/* Bottom connecting line */}
			<div className="w-px h-10 bg-gray-300/40 mt-6"></div>
		</div>
	)
}

export default RewardsTimeline
