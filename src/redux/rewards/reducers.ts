// apicore
import { APICore } from '../../helpers/api/apiCore'

// constants
import { RewardsActionTypes } from './constants'

const api = new APICore()

const INIT_STATE = {
	allRewards: [],
	loading: false,
}

interface State {
	allRewards?: any
	loading?: boolean
	value?: boolean
}

const Auth = (state: State = INIT_STATE, action: any): any => {
	switch (action.type) {
		case RewardsActionTypes.API_RESPONSE_SUCCESS:
			switch (action.payload.actionType) {
				case RewardsActionTypes.GET_REWARDS: {
					const { data } = action.payload
					return {
						...state,
						allRewards: data.data,
						loading: false,
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

				default:
					return { ...state }
			}

		default:
			return { ...state }
	}
}

export default Auth
