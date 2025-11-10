import React, { useEffect } from 'react'
import { Grid, _ } from 'gridjs-react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { UsersActionTypes } from '@/redux/users/constants'
import GoogleIcon from '../ui/icons/GoogleIcon'

const Users = () => {
	const dispatch = useDispatch()
	const { allUsers, loading, error } = useSelector((state: any) => state.Users)

	useEffect(() => {
		dispatch({ type: UsersActionTypes.GET_USERS })
	}, [dispatch])

	// Prepare safe data
	const tableData = allUsers?.map((user: any) => [`${user.first_name} ${user.last_name}`, user.email, { email_verified: user.email_verified_at, auth_provider: user.auth_provider }, user.user_details?.country?.name || '']) || []

	return (
		<div>
			<div className="card">
				<div className="card-header">
					<div className="flex justify-between items-center">
						<h4 className="card-title">Users</h4>
					</div>
				</div>

				<div className="p-6">
					<p className="text-sm text-slate-700 dark:text-slate-400 mb-4">List of registered users and their details.</p>

					<Grid
						search={true}
						sort={true}
						resizable={true}
						data={tableData}
						style={{
							table: {},
							th: {
								'background-color': 'rgba(0, 0, 0, 0.1)',
								color: '#000',
							},
							td: {},
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
												<span
													title={moment(cell).format('DD-MMM-YYYY')} // Tooltip on hover
													className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700"
												>
													{moment(cell.email_verified).format('DD-MMM-YYYY')}
												</span>
											) : (
												<span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-600">Not Verified</span>
											)}
											{cell.auth_provider === 'google' && <GoogleIcon />}
										</div>
									),
							},
							{
								name: 'Country',
								filter: {
									enabled: true, // ✅ allows filtering for this column
								},
							},
						]}
						height="100%"
						fixedHeader={true}
						pagination={{ enabled: true, limit: 10 }}
					/>
				</div>
			</div>
		</div>
	)
}

export default Users
