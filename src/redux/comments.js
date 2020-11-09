import * as ActionTypes from './ActionTypes';

export const Comments = (state = { errorMsg: null, comments: [] }, action) => {
	switch (action.type) {
		case ActionTypes.ADD_COMMENTS:
			return { ...state, errorMsg: null, comments: action.payload };

		case ActionTypes.COMMENTS_FAILED:
			return { ...state, errorMsg: action.payload };

		case ActionTypes.ADD_COMMENT:
			const comment = action.payload;

			return { ...state, comments: state.comments.concat(comment) };

		default:
			return state;
	}
};
