// apicore
import { APICore } from '../../helpers/api/apiCore'

// constants
import { WaitlistActionTypes } from './constants'

const api = new APICore()

const INIT_STATE: State = {
	waitlistDatas: [],
	loading: false,
	meta: {},
}

interface State {
	waitlistDatas?: any
	loading?: boolean
	meta: any
}

const Auth = (state: State = INIT_STATE, action: any): any => {
	switch (action.type) {
		case WaitlistActionTypes.API_RESPONSE_LOADING:
			return {
				...state,
				loading: true,
				error: null,
			}

		case WaitlistActionTypes.API_RESPONSE_SUCCESS:
			switch (action.payload.actionType) {
				case WaitlistActionTypes.GET_WAITLIST: {
					const { data } = action.payload
					return {
						...state,
						waitlistDatas: data.data,
						meta: data.meta,
						loading: false,
					}
				}

				default:
					return { ...state }
			}

		case WaitlistActionTypes.API_RESPONSE_ERROR:
			switch (action.payload.actionType) {
				case WaitlistActionTypes.GET_WAITLIST: {
					return {
						...state,
						waitlistDatas: [],
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
