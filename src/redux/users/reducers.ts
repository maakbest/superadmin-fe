// apicore
import { APICore } from '../../helpers/api/apiCore'

// constants
import { UsersActionTypes } from './constants'

const api = new APICore()

const INIT_STATE = {
	allUsers: [],
	loading: false,
}

interface State {
	allUsers?: any
	loading?: boolean
	value?: boolean
}

const Auth = (state: State = INIT_STATE, action: any): any => {
	switch (action.type) {
		case UsersActionTypes.API_RESPONSE_LOADING:
			return {
				...state,
				loading: true,
				error: null,
			}

		case UsersActionTypes.API_RESPONSE_SUCCESS:
			switch (action.payload.actionType) {
				case UsersActionTypes.GET_USERS: {
					const { data } = action.payload
					return {
						...state,
						allUsers: data.data,
						loading: false,
					}
				}
				default:
					return { ...state }
			}

		case UsersActionTypes.API_RESPONSE_ERROR:
			switch (action.payload.actionType) {
				case UsersActionTypes.GET_USERS: {
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
