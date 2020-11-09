import * as ActionTypes from './ActionTypes';

export const Campsites = (
	state = {
		isLoading: true,
		errorMsg: null,
		campsites: [],
	},
	action
) => {
	switch (action.type) {
		case ActionTypes.ADD_CAMPSITES:
			return {
				...state,
				isLoading: false,
				errorMsg: null,
				campsites: action.payload,
			};
		case ActionTypes.CAMPSITES_FAILED:
			console.log('FFFFAAAAAAIIIIILLLLL');
			return {
				...state,
				isLoading: false,
				errorMsg: action.payload,
				campsites: [],
			};
		case ActionTypes.CAMPSITES_LOADING:
			return {
				...state,
				isLoading: true,
				errorMsg: null,
				campsites: [],
			};
		default:
			return state;
	}
};
