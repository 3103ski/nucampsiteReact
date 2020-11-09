import * as ActionTypes from '../redux/ActionTypes';

export const Promotions = (state = { isLoading: true, errorMsg: null, promotions: [] }, action) => {
	switch (action.type) {
		case ActionTypes.ADD_PROMOTIONS:
			return { ...state, isLoading: false, errorMsg: null, promotions: action.payload };

		case ActionTypes.PROMOTIONS_LOADING:
			return { ...state, isLoading: true, errorMsg: null, promotions: [] };

		case ActionTypes.PROMOTIONS_FAILED:
			return { ...state, isLoading: false, errorMsg: action.payload };

		default:
			return state;
	}
};
