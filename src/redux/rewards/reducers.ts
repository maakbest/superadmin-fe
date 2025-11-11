// apicore
import { APICore } from '../../helpers/api/apiCore'

// constants
import { RewardsActionTypes } from './constants'

const api = new APICore()

const INIT_STATE: State = {
	allRewards: [],
	loading: false,
	request_status: 'DEFAULT',
	meta: {},
}

interface State {
	allRewards?: any
	loading?: boolean
	value?: boolean
	request_status: 'DEFAULT' | 'APPROVED' | 'REJECTED'
	meta: any
}

const Auth = (state: State = INIT_STATE, action: any): any => {
	switch (action.type) {
		case RewardsActionTypes.API_RESPONSE_LOADING:
			return {
				...state,
				loading: true,
				error: null,
			}

		case RewardsActionTypes.API_RESPONSE_SUCCESS:
			switch (action.payload.actionType) {
				case RewardsActionTypes.GET_REWARDS: {
					const { data } = action.payload
					return {
						...state,
						allRewards: data.data,
						meta: data.meta,
						loading: false,
					}
				}
				case RewardsActionTypes.REQUEST_APPROVED: {
					return {
						...state,
						request_status: 'APPROVED',
					}
				}
				case RewardsActionTypes.REQUEST_REJECTED: {
					return {
						...state,
						request_status: 'APPROVED',
					}
				}
				default:
					return { ...state }
			}

		case RewardsActionTypes.API_RESPONSE_ERROR:
			switch (action.payload.actionType) {
				case RewardsActionTypes.GET_REWARDS: {
					return {
						...state,
						error: action.payload.error,
						loading: false,
					}
				}

				case RewardsActionTypes.REQUEST_APPROVED: {
					return {
						...state,
						request_status: 'REJECTED',
						error: action.payload.error,
					}
				}

				case RewardsActionTypes.REQUEST_REJECTED: {
					return {
						...state,
						request_status: 'REJECTED',
						error: action.payload.error,
					}
				}
				default:
					return { ...state }
			}

		default:
			return { ...state }
	}
}

export default Auth
