// apicore
import { APICore } from '../../helpers/api/apiCore'

// constants
import { DashboardActionTypes } from './constants'

const api = new APICore()

const INIT_STATE = {
	totalActiveUsers: [],
	dailyActiveUsers: [],
	registeredUsers: [],
	verifiedNotVerifiedUsers: [],
	newSignUsers: null,
	newSignUsersNotOnboarding: null,
	loading: false,
	error: '',
}

interface State {
	totalActiveUsers: any[]
	dailyActiveUsers: any[]
	registeredUsers: any[]
	verifiedNotVerifiedUsers: any[]
	newSignUsers: any
	newSignUsersNotOnboarding: any
	loading?: boolean
	error: string
}

const Dashboard = (state: State = INIT_STATE, action: any): any => {
	switch (action.type) {
		case DashboardActionTypes.API_RESPONSE_LOADING:
			return {
				...state,
				loading: true,
				error: null,
			}

		case DashboardActionTypes.API_RESPONSE_SUCCESS:
			switch (action.payload.actionType) {
				case DashboardActionTypes.GET_DAILY_ACTIVE_USERS: {
					const { data } = action.payload
					return {
						...state,
						dailyActiveUsers: data.active_users,
						loading: false,
						error: '',
					}
				}

				case DashboardActionTypes.GET_TOTAL_ACTIVE_USERS: {
					const { data } = action.payload
					return {
						...state,
						totalActiveUsers: data.data,
						loading: false,
						error: '',
					}
				}

				case DashboardActionTypes.GET_REGISTERED_USERS: {
					const { data } = action.payload
					return {
						...state,
						registeredUsers: data.count,
						loading: false,
						error: '',
					}
				}

				case DashboardActionTypes.GET_VERIFIED_NOT_VERIFIED_USERS: {
					const { data } = action.payload

					return {
						...state,
						verifiedNotVerifiedUsers: data.data,
						loading: false,
						error: '',
					}
				}

				case DashboardActionTypes.GET_NEW_SIGNUP_USERS: {
					const { data } = action.payload
					return {
						...state,
						newSignUsers: data.count,
						loading: false,
						error: '',
					}
				}

				case DashboardActionTypes.GET_NEW_SIGNUP_USERS_NOT_ONBOARDING: {
					const { data } = action.payload

					return {
						...state,
						newSignUsersNotOnboarding: data.count,
						loading: false,
						error: '',
					}
				}
				default:
					return { ...state }
			}

		case DashboardActionTypes.API_RESPONSE_ERROR:
			switch (action.payload.actionType) {
				case DashboardActionTypes.GET_DAILY_ACTIVE_USERS: {
					return {
						...state,
						error: action.payload.error,
						loading: false,
					}
				}

				case DashboardActionTypes.GET_REGISTERED_USERS: {
					return {
						...state,
						error: action.payload.error,
						loading: false,
					}
				}

				case DashboardActionTypes.GET_TOTAL_ACTIVE_USERS: {
					return {
						...state,
						error: action.payload.error,
						loading: false,
					}
				}

				case DashboardActionTypes.GET_VERIFIED_NOT_VERIFIED_USERS: {
					return {
						...state,
						error: action.payload.error,
						loading: false,
					}
				}

				case DashboardActionTypes.GET_NEW_SIGNUP_USERS: {
					return {
						...state,
						error: action.payload.error,
						loading: false,
					}
				}

				case DashboardActionTypes.GET_NEW_SIGNUP_USERS_NOT_ONBOARDING: {
					return {
						...state,
						error: action.payload.error,
						loading: false,
					}
				}

				default:
					return { ...state }
			}

		default:
			return { ...state }
	}
}

export default Dashboard
