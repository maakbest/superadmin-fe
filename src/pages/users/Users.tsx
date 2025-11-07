import React, { useEffect } from 'react'
import { Grid, _ } from 'gridjs-react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { UsersActionTypes } from '@/redux/users/constants'

const Users = () => {
	const dispatch = useDispatch()
	const { allUsers, loading, error } = useSelector((state: any) => state.Users)

	useEffect(() => {
		dispatch({ type: UsersActionTypes.GET_USERS })
	}, [dispatch])

	// Prepare safe data
	const tableData = allUsers?.map((user: any) => [`${user.first_name} ${user.last_name}`, user.email, user.is_admin, user.email_verified_at, user.user_details?.country?.name || '']) || []

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
						data={tableData}
						columns={[
							'Name',
							'Email',
							{
								name: 'Admin',
								formatter: (cell: boolean) => _(<span className={`px-2 py-1 rounded text-xs font-medium ${cell ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>{cell ? 'Yes' : 'No'}</span>),
							},
							{
								name: 'Email Verified',
								formatter: (cell: string | null) =>
									_(
										cell ? (
											<span
												title={moment(cell).format('DD-MMM-YYYY')} // Tooltip on hover
												className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700"
											>
												Yes — {moment(cell).format('DD-MMM-YYYY')}
											</span>
										) : (
											<span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-600">No</span>
										)
									),
							},
							'Country',
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
