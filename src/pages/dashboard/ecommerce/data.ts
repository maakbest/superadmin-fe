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

// Spiline Area
export const spilineAreaApexOpts: ApexOptions = {
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
			data: [31, 40, 28, 51, 42, 109, 100],
		},
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
	// grid: {
	//     borderColor: '#f1f3fa',

	// }
}
export { products }
