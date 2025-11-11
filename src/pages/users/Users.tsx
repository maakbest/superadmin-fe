import React, { useEffect, useState, useMemo } from 'react'
import { Grid, _ } from 'gridjs-react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { UsersActionTypes } from '@/redux/users/constants'
import GoogleIcon from '../ui/icons/GoogleIcon'

const Users = () => {
	const dispatch = useDispatch()
	const { allUsers, loading, error } = useSelector((state: any) => state.Users)

	// ✅ Local filters
	const [searchTerm, setSearchTerm] = useState('')
	const [verifiedFilter, setVerifiedFilter] = useState<'all' | 'yes' | 'no'>('all')
	const [countryFilter, setCountryFilter] = useState('all')

	useEffect(() => {
		dispatch({ type: UsersActionTypes.GET_USERS })
	}, [dispatch])

	// ✅ Compute unique countries for dropdown
	//@ts-ignore
	const countryOptions = useMemo<string[]>(() => {
		if (!allUsers) return ['all']
		const unique = new Set(allUsers.map((u: any) => u.user_details?.country?.name || 'Unknown'))
		return ['all', ...Array.from(unique)]
	}, [allUsers])

	// ✅ Prepare data with filters
	const filteredUsers = useMemo(() => {
		if (!allUsers) return []
		return allUsers.filter((user: any) => {
			const name = `${user.first_name} ${user.last_name}`.toLowerCase()
			const email = user.email.toLowerCase()
			const verified = Boolean(user.email_verified_at)
			const country = user.user_details?.country?.name || 'Unknown'

			const matchesSearch = name.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase())
			const matchesVerified = verifiedFilter === 'all' || (verifiedFilter === 'yes' && verified) || (verifiedFilter === 'no' && !verified)
			const matchesCountry = countryFilter === 'all' || countryFilter === country

			return matchesSearch && matchesVerified && matchesCountry
		})
	}, [allUsers, searchTerm, verifiedFilter, countryFilter])

	// ✅ Prepare Grid.js data
	const tableData =
		filteredUsers?.map((user: any) => [
			`${user.first_name} ${user.last_name}`,
			user.email,
			{
				email_verified: user.email_verified_at,
				auth_provider: user.auth_provider,
			},
			user.user_details?.country?.name || 'Unknown',
		]) || []

	return (
		<div>
			{loading && (
				<div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
					<div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
				</div>
			)}

			<div className="card">
				<div className="card-header">
					<div className="flex justify-between items-center">
						<h4 className="card-title">Users</h4>
					</div>
				</div>

				<div className="p-6">
					<p className="text-sm text-slate-700 dark:text-slate-400 mb-4">List of registered users and their details.</p>

					{/* ✅ Filter Controls */}
					<div className="flex flex-wrap gap-3 mb-4 items-center">
						<input type="text" placeholder="Search by name or email" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border border-gray-300 rounded px-3 py-2 text-sm w-full sm:w-64" />

						<select value={verifiedFilter} onChange={(e) => setVerifiedFilter(e.target.value as any)} className="border border-gray-300 rounded px-3 py-2 text-sm">
							<option value="all">All Users</option>
							<option value="yes">Verified</option>
							<option value="no">Not Verified</option>
						</select>

						<select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} className="border border-gray-300 rounded px-3 py-2 text-sm w-[150px]">
							{countryOptions.map((c) => (
								<option key={c} value={c}>
									{c === 'all' ? 'All Countries' : c}
								</option>
							))}
						</select>
					</div>

					{/* ✅ Table */}
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
						]}
						pagination={{ enabled: true, limit: 10 }}
					/>
				</div>
			</div>
		</div>
	)
}

export default Users
