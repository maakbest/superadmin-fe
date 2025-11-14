import { ApexOptions } from 'apexcharts'
import moment from 'moment'

const products = [
	{
		product: 'ASOS Ridley High Waist',
		price: 79.49,
		orders: 82,
		quantity: '8,540',
		seller: 'Adidas',
	},
	{
		product: 'Marco Lightweight Shirt',
		price: 12.5,
		orders: 58,
		quantity: '6,320',
		seller: 'Puma',
	},
	{
		product: 'Half Sleeve Shirt',
		price: 9.99,
		orders: 254,
		quantity: '10,258',
		seller: 'Nike',
	},
	{
		product: 'Lightweight Jacket',
		price: 69.99,
		orders: 560,
		quantity: '1,020',
		seller: 'Puma',
	},
	{
		product: 'Marco Sport Shoes',
		price: 119.99,
		orders: 75,
		quantity: '357',
		seller: 'Adidas',
	},
	{
		product: "Custom Women's T-shirts",
		price: 45.0,
		orders: 85,
		quantity: '135',
		seller: 'Branded',
	},
]

// SUPER ADMIN

export const constructDualVerified = (data: any[], filterType: 'daily' | 'weekly' | 'monthly' | 'yearly') => {
	const grouped = data.reduce((acc: any, item: any) => {
		let key = ''
		let label = ''
		let year = moment().year()
		let month = ''
		let date: moment.Moment

		// 🔹 Determine grouping key and label based on filter type
		try {
			if (filterType === 'weekly') {
				let week: number | null = null
				let yearStr = moment().year().toString()

				// extract week & year from label
				const match = item.label?.match(/Week\s(\d+)\s-\s(\d+)/)
				if (match) {
					week = parseInt(match[1], 10)
					yearStr = match[2]
				}

				if (week) {
					year = parseInt(yearStr, 10)
					date = moment().year(year).week(week).startOf('week')
					month = date.format('MMMM')
					key = `${year}-W${week}`
					label = `Week ${week}`
				}
			} else if (filterType === 'monthly') {
				date = moment(item.label, ['YYYY-MM', 'YYYY-MM-DD', moment.ISO_8601], true)
				if (!date.isValid()) date = moment()
				month = date.format('MMMM')
				year = date.year()
				key = `${year}-${date.format('MM')}`
				label = `${date.format('MMM')}`
			} else if (filterType === 'yearly') {
				year = parseInt(item.label?.match(/\d{4}/)?.[0] || moment().year())
				key = `${year}`
				label = `${year}`
			} else if (filterType === 'daily') {
				date = moment(item.label, ['YYYY-MM-DD', moment.ISO_8601], true)
				if (!date.isValid()) date = moment()
				year = date.year()
				month = date.format('MMMM')
				key = date.format('YYYY-MM-DD')
				label = key
			}
		} catch {
			// fallback
			key = 'unknown'
			label = 'Unknown'
		}

		// ✅ Initialize group if missing
		if (!acc[key]) {
			acc[key] = { month, year, label, verified_users: 0, non_verified_users: 0 }
		}

		// ✅ Safely increment
		acc[key].verified_users += item.verified_users || 0
		acc[key].non_verified_users += item.non_verified_users || 0

		return acc
	}, {})

	// ✅ Sort result chronologically
	const result = Object.values(grouped).sort((a: any, b: any) => moment(a.label, ['YYYY-MM-DD', 'YYYY-MM', 'Week WW - YYYY', 'YYYY']).diff(moment(b.label, ['YYYY-MM-DD', 'YYYY-MM', 'Week WW - YYYY', 'YYYY'])))

	// ✅ Convert to arrays for chart
	const res: any = result.reduce(
		(acc: any, curr: any) => {
			acc.labels.push(curr.label)
			acc.verified.push(curr.verified_users)
			acc.not_verified.push(curr.non_verified_users)
			return acc
		},
		{ labels: [], verified: [], not_verified: [] }
	)

	// ✅ ApexChart Config
	const spilineAreaApexOpts: ApexOptions = {
		chart: {
			height: 380,
			type: 'area',
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			width: 3,
			curve: 'smooth',
		},
		colors: ['#3e60d5', '#6c757d'],
		series: [
			{
				name: 'Verified Users',
				data: res.verified,
			},
			{
				name: 'Not Verified Users',
				data: res.not_verified,
			},
		],
		xaxis: {
			categories: res.labels,
			labels: { rotate: -45 },
		},
		grid: {
			row: {
				colors: ['transparent', 'transparent'],
				opacity: 0.2,
			},
			borderColor: '#f1f3fa',
		},
		legend: { offsetY: 5 },
		tooltip: { fixed: { enabled: false } },
	}

	return spilineAreaApexOpts
}

export const buildGenericApexSeries = (data: any[], filterType: 'daily' | 'weekly' | 'monthly' | 'yearly') => {
	// console.log('data', data)
	// if (!Array.isArray(data)) return []
	const grouped = data.reduce((acc: any, item: any) => {
		let key = ''
		let label = ''
		let year = moment().year()
		let month = ''
		let date: moment.Moment

		try {
			if (filterType === 'weekly') {
				let week: number | null = null
				let yearStr = moment().year().toString()

				const match = item.label?.match(/Week\s(\d+)\s-\s(\d+)/)
				if (match) {
					week = parseInt(match[1], 10)
					yearStr = match[2]
				}

				if (week) {
					year = parseInt(yearStr, 10)
					date = moment().year(year).week(week).startOf('week')
					month = date.format('MMMM')
					key = `${year}-W${week}`
					label = `Week ${week}`
				}
			} else if (filterType === 'monthly') {
				date = moment(item.label, ['YYYY-MM', 'YYYY-MM-DD', moment.ISO_8601], true)
				if (!date.isValid()) date = moment()
				month = date.format('MMMM')
				year = date.year()
				key = `${year}-${date.format('MM')}`
				label = `${date.format('MMM')}`
			} else if (filterType === 'yearly') {
				year = parseInt(item.label?.match(/\d{4}/)?.[0] || moment().year())
				key = `${year}`
				label = `${year}`
			} else if (filterType === 'daily') {
				date = moment(item.label, ['YYYY-MM-DD', moment.ISO_8601], true)
				if (!date.isValid()) date = moment()
				year = date.year()
				month = date.format('MMMM')
				key = date.format('YYYY-MM-DD')
				label = key
			}
		} catch {
			key = 'unknown'
			label = 'Unknown'
		}

		if (!acc[key]) {
			acc[key] = { month, year, label }
		}

		for (const k in item) {
			if (k !== 'label' && typeof item[k] === 'number') {
				acc[key][k] = (acc[key][k] || 0) + item[k]
			}
		}

		return acc
	}, {})

	const result = Object.values(grouped).sort((a: any, b: any) => moment(a.label).diff(moment(b.label)))

	// ensure TypeScript knows the shape and handle empty result
	const first = result[0] as Record<string, any> | undefined
	const seriesKeys = first ? Object.keys(first).filter((k) => k !== 'label' && k !== 'month' && k !== 'year') : []

	const labels = result.map((x: any) => x.label)

	const series = seriesKeys.map((key) => ({
		name: key.replace(/_/g, ' ').replace(/\b\w/g, (x) => x.toUpperCase()),
		data: result.map((x: any) => x[key] || 0),
	}))

	const spilineAreaApexOpts: ApexOptions = {
		chart: { height: 380, type: 'area' },
		dataLabels: { enabled: false },
		stroke: { width: 3, curve: 'smooth' },
		colors: ['#3e60d5', '#6c757d', '#ff9800', '#4caf50'],
		series,
		xaxis: { categories: labels, labels: { rotate: -45 } },
		grid: {
			row: { colors: ['transparent', 'transparent'], opacity: 0.2 },
			borderColor: '#f1f3fa',
		},
		legend: { offsetY: 5 },
		tooltip: { fixed: { enabled: false } },
	}

	return spilineAreaApexOpts
}

// Spiline Area
export const dailyActiveUserData: ApexOptions = {
	chart: {
		height: 380,
		type: 'area',
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		width: 3,
		curve: 'smooth',
	},
	colors: ['#3e60d5', '#6c757d'],
	series: [
		{
			name: 'Not Verified Users',
			data: [11, 32, 45, 32, 34, 52, 41],
		},
	],
	legend: {
		offsetY: 5,
	},
	xaxis: {
		categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
	},
	tooltip: {
		fixed: {
			enabled: false,
			position: 'topRight',
		},
	},
	grid: {
		row: {
			colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
			opacity: 0.2,
		},
		borderColor: '#f1f3fa',
		padding: {
			bottom: 5,
		},
	},
}
export { products }
