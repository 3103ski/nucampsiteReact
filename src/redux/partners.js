import * as ActionTypes from './ActionTypes';

export const Partners = (
	state = {
		isLoading: true,
		errorMsg: null,
		partners: [],
	},
	action
) => {
	switch (action.type) {
		case ActionTypes.ADD_PARTNERS:
			return {
				...state,
				isLoading: false,
				partners: action.payload,
			};
		case ActionTypes.ADD_PARTNERS_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypes.ADD_PARTNERS_FAILED:
			return {
				...state,
				isLoading: false,
				errorMsg: action.payload,
			};
		default:
			return state;
	}
};
