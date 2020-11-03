import * as ActionTypes from './ActionTypes';
import { CAMPSITES } from '../shared/campsites';

export const addComment = (campsiteId, rating, author, text) => ({
	type: ActionTypes.ADD_COMMENT,
	payload: {
		campsiteId,
		rating,
		author,
		text,
	},
});

//_________________
// FETCH CAMPSITES
//-----------------

export const fetchCampsites = () => (dispatch) => {
	dispatch(campsitesLoading());

	setTimeout(() => {
		dispatch(addCampsites(CAMPSITES));
	}, 2000);
};

export const campsitesLoading = () => ({
	type: ActionTypes.CAMPSITES_LOADING,
});

export const campsitesFailed = (errMsg) => ({
	type: ActionTypes.CAMPSITES_FAILED,
	payload: errMsg,
});

export const addCampsites = (campsites) => ({
	type: ActionTypes.ADD_CAMPSITES,
	payload: campsites,
});
