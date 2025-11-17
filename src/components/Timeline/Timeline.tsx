import React from 'react'
import moment from 'moment'

export interface HistoryItem {
	id: string | number
	title: string
	description?: string
	created_at: string | Date
}

interface TimelineProps {
	items: HistoryItem[]
	title?: string
}

const Timeline: React.FC<TimelineProps> = ({ items, title = 'History' }) => {
	return (
		<div className="w-full">
			<h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">{title}</h2>

			<div className="relative">
				{/* Vertical Line */}
				<div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-300 dark:bg-slate-700"></div>

				{/* Timeline Items */}
				<div className="space-y-10">
					{items.map((item, index) => {
						const isLeft = index % 2 === 0

						return (
							<div key={item.id} className={`flex items-center w-full ${isLeft ? 'justify-start' : 'justify-end'}`}>
								<div
									className={`
										w-1/2 px-4 py-3 rounded-lg shadow-md border
										bg-white dark:bg-slate-900
										border-slate-200 dark:border-slate-700
										${isLeft ? 'text-left' : 'text-right'}
									`}
								>
									<h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.title}</h3>

									{item.description && <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{item.description}</p>}

									<p className="text-xs text-slate-400 mt-2">{moment(item.created_at).format('DD MMM YYYY, hh:mm A')}</p>
								</div>

								{/* Dot */}
								<div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-slate-900"></div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default Timeline
