import React, { useEffect, useState } from 'react'
import { Grid, _ } from 'gridjs-react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { UsersActionTypes } from '@/redux/users/constants'
import GoogleIcon from '../ui/icons/GoogleIcon'
import { CountriesActionTypes } from '@/redux/countries/constants'
import SearchableDropdown from '@/components/SearchableDropdown/SearchableDropdown'
import { useDebounce } from '@/hooks'

const Users = () => {
	const dispatch = useDispatch()
	const { allUsers, loading, meta } = useSelector((state: any) => state.Users)
	const { allCountries } = useSelector((state: any) => state.Countries)

	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearchTerm = useDebounce(searchTerm, 1000)

	const [verifiedFilter, setVerifiedFilter] = useState<'all' | 'yes' | 'no'>('all')
	const [countryFilter, setCountryFilter] = useState({ name: 'All Countries', code: 'all' })
	const [authProvider, setAuthProvider] = useState<'all' | 'google' | 'local'>('all')
	const [riskScore, setRiskScore] = useState('all')
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(10)

	const handleResetFilters = () => {
		setSearchTerm('')
		setVerifiedFilter('all')
		setCountryFilter({ name: 'All Countries', code: 'all' })
		setAuthProvider('all')
		setRiskScore('all')
		setPage(1)
		setLimit(10)

		fetchUsers(1)
	}

	// 🔹 Fetch filters
	useEffect(() => {
		dispatch({ type: CountriesActionTypes.GET_COUNTRIES })
	}, [dispatch])

	// 🔹 Fetch users when filters/page change
	const fetchUsers = (p = 1) => {
		const params: Record<string, any> = { page: p, per_page: limit }

		if (debouncedSearchTerm.trim()) params.search = debouncedSearchTerm

		if (countryFilter.code !== 'all') params.country = countryFilter.code
		if (verifiedFilter !== 'all') params.is_email_verified = verifiedFilter === 'yes'
		if (authProvider !== 'all') params.auth_provider = authProvider
		if (riskScore !== 'all') params.risk_score = riskScore

		dispatch({ type: UsersActionTypes.GET_USERS, payload: params })
	}

	useEffect(() => {
		fetchUsers(page)
	}, [debouncedSearchTerm, countryFilter, verifiedFilter, authProvider, page, riskScore, limit])

	// 🔹 Table data
	const tableData =
		allUsers?.map((user: any) => [
			`${user.first_name} ${user.last_name}`,
			user.email,
			{
				email_verified: user.email_verified_at,
				auth_provider: user.auth_provider,
			},
			user.user_details?.country?.name || 'Unknown',
			user.risk_score,
		]) || []

	// 🔹 Pagination Logic
	const totalPages = Math.ceil((meta?.total || 0) / limit)
	const goToPage = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) setPage(newPage)
	}

	return (
		<div>
			{loading && (
				<div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
					<div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
				</div>
			)}

			<div className="card">
				<div className="card-header">
					<h4 className="card-title text-lg font-semibold">Users</h4>
				</div>
				<div className="p-6">
					<h4 className="card-title mb-4">Filters</h4>
					{/* 🔹 Filters */}
					<div className="flex flex-wrap gap-3 mb-4 items-center">
						<input type="text" placeholder="Search by name or email" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border border-gray-300 rounded px-3 py-2 text-sm w-full sm:w-64" />

						<select value={verifiedFilter} onChange={(e) => setVerifiedFilter(e.target.value as any)} className="border border-gray-300 rounded px-3 py-2 text-sm">
							<option value="all">All Users</option>
							<option value="yes">Verified</option>
							<option value="no">Not Verified</option>
						</select>

						<select value={authProvider} onChange={(e) => setAuthProvider(e.target.value as any)} className="border border-gray-300 rounded px-3 py-2 text-sm w-[150px]">
							<option value="all">All Providers</option>
							<option value="google">Google</option>
							<option value="local">Email</option>
						</select>

						<select value={riskScore} onChange={(e) => setRiskScore(e.target.value as any)} className="border border-gray-300 rounded px-3 py-2 text-sm w-[150px]">
							<option value="all">All Scores</option>
							<option value="0-25">0 - 25</option>
							<option value="25-50">25 - 50</option>
							<option value="50-75">50 - 75</option>
							<option value="50-75">75 - 100</option>
						</select>

						<SearchableDropdown options={[{ name: 'All Countries', code: 'all' }, ...allCountries]} selected={countryFilter} onSelect={setCountryFilter} labelKey="name" className="w-[200px]" />

						<button onClick={handleResetFilters} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-sm transition">
							Reset Filters
						</button>
					</div>

					{/* 🔹 Table */}
					{tableData.length > 0 ? (
						<Grid
							data={tableData}
							sort={true}
							resizable={true}
							style={{
								th: {
									backgroundColor: 'rgba(0, 0, 0, 0.05)',
									fontWeight: '600',
								},
							}}
							columns={[
								'Name',
								'Email',
								{
									name: 'Email Verified',
									formatter: (cell: any) =>
										_(
											<div className="flex items-center gap-2">
												{cell.email_verified ? (
													<span title={moment(cell.email_verified).format('DD-MMM-YYYY')} className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
														{moment(cell.email_verified).format('DD-MMM-YYYY')}
													</span>
												) : (
													<span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-600">Not Verified</span>
												)}
												{cell.auth_provider === 'google' && <GoogleIcon />}
											</div>
										),
								},
								'Country',
								'Risk Score',
							]}
						/>
					) : (
						<div className="border rounded-md overflow-hidden">
							{/* ✅ Custom Empty Table with Headers */}
							<table className="min-w-full text-sm text-left border-collapse">
								<thead className="bg-gray-100 text-gray-700 font-semibold">
									<tr>
										<th className="px-4 py-2 border-b">Name</th>
										<th className="px-4 py-2 border-b">Email</th>
										<th className="px-4 py-2 border-b">Email Verified</th>
										<th className="px-4 py-2 border-b">Country</th>
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
		</div>
	)
}

export default Users
