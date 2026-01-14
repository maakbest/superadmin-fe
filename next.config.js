module.exports = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/auth/login', // or /dashboard, /app, etc.
				permanent: false,
			},
		]
	},
}
