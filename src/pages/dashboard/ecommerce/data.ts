import { ApexOptions } from 'apexcharts'

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
import moment from 'moment'

// const data = [
//   { label: "Week 42 - 2025", verified_users: 2, non_verified_users: 1 },
//   { label: "Week 43 - 2025", verified_users: 5, non_verified_users: 9 },
//   { label: "Week 44 - 2025", verified_users: 3, non_verified_users: 5 },
//   { label: "Week 45 - 2025", verified_users: 4, non_verified_users: 0 },
// ];

export const constructDualVerified = (data: any) => {
	const groupedByMonth = data.reduce((acc: any, item: any) => {
		// Extract week and year
		const [_, weekStr, yearStr] = item.label.match(/Week\s(\d+)\s-\s(\d+)/) || []
		const week = parseInt(weekStr, 10)
		const year = parseInt(yearStr, 10)

		// ✅ Get month name for that week
		const date = moment().year(year).week(week).startOf('week')
		const month = date.format('MMMM') // e.g. "October"

		const key = `${month}-${year}` // unique key for grouping

		if (!acc[key]) {
			acc[key] = { month, year, verified_users: 0, non_verified_users: 0 }
		}

		acc[key].verified_users += item.verified_users
		acc[key].non_verified_users += item.non_verified_users

		return acc
	}, {})

	// ✅ Convert to sorted array by year & month order
	const result = Object.values(groupedByMonth).sort((a: any, b: any) => moment(`${a.month} ${a.year}`, 'MMMM YYYY').diff(moment(`${b.month} ${b.year}`, 'MMMM YYYY')))

	const res: any = result.reduce(
		(acc: any, curr: any) => {
			acc.month.push(curr.month)
			acc.year.push(curr.year)
			acc.verified.push(curr.verified_users)
			acc.not_verified.push(curr.non_verified_users)
			return acc
		},
		{ month: [], year: [], verified: [], not_verified: [] }
	)

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
		legend: {
			offsetY: 5,
		},
		xaxis: {
			categories: res.month,
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
	return spilineAreaApexOpts
}

// Spiline Area
// export const spilineAreaApexOpts: ApexOptions = {
// 	chart: {
// 		height: 380,
// 		type: 'area',
// 	},
// 	dataLabels: {
// 		enabled: false,
// 	},
// 	stroke: {
// 		width: 3,
// 		curve: 'smooth',
// 	},
// 	colors: ['#3e60d5', '#6c757d'],
// 	series: [
// 		{
// 			name: 'Verified Users',
// 			data: [31, 40, 28, 51, 42, 109, 100],
// 		},
// 		{
// 			name: 'Not Verified Users',
// 			data: [11, 32, 45, 32, 34, 52, 41],
// 		},
// 	],
// 	legend: {
// 		offsetY: 5,
// 	},
// 	xaxis: {
// 		categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
// 	},
// 	tooltip: {
// 		fixed: {
// 			enabled: false,
// 			position: 'topRight',
// 		},
// 	},
// 	grid: {
// 		row: {
// 			colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
// 			opacity: 0.2,
// 		},
// 		borderColor: '#f1f3fa',
// 		padding: {
// 			bottom: 5,
// 		},
// 	},
// }
export { products }
