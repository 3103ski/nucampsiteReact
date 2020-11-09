import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

// ********************************
// 			FETCHING
// ********************************
//_________________
// FETCH CAMPSITES
//-----------------
export const fetchCampsites = () => (dispatch) => {
	dispatch(campsitesLoading());
	return fetch(baseUrl + 'campsites')
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(`Error ${response.status}: ${response.statusText}`);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				const errorMsg = new Error(error.message);
				throw errorMsg;
			}
		)
		.then((response) => response.json())
		.then((campsites) => dispatch(addCampsites(campsites)))
		.catch((error) => dispatch(campsitesFailed(error.message)));
};

export const campsitesLoading = () => ({
	type: ActionTypes.CAMPSITES_LOADING,
});

export const campsitesFailed = (errMsg) => ({
	type: ActionTypes.CAMPSITES_FAILED,
	payload: errMsg,
});

export const addCampsites = (campsites) => {
	return { type: ActionTypes.ADD_CAMPSITES, payload: campsites };
};

//__________________
// FETCH COMMENTS
//------------------
export const fetchComments = () => (dispatch) => {
	return fetch(baseUrl + 'comments')
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(`Error ${response.status}: ${response.statusText}`);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				const errorMsg = new Error(error.message);
				throw errorMsg;
			}
		)
		.then((response) => response.json())
		.then((comments) => dispatch(addComments(comments)))
		.catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errorMsg) => ({
	type: ActionTypes.COMMENTS_FAILED,
	payload: errorMsg,
});

export const addComments = (comments) => ({
	type: ActionTypes.ADD_COMMENTS,
	payload: comments,
});

//____________________
// FETCH Partners
//--------------------
export const fetchPartners = () => (dispatch) => {
	dispatch(partnersLoading());
	return fetch(baseUrl + 'partners')
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(`Error ${response.status}: ${response.statusText}`);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				const errorMsg = new Error(error.message);
				throw errorMsg;
			}
		)
		.then((response) => response.json())
		.then((partners) => {
			return dispatch(addPartners(partners));
		})
		.catch((error) => dispatch(partnersFailed(error.message)));
};

export const partnersLoading = () => ({
	type: ActionTypes.ADD_PARTNERS_LOADING,
});

export const partnersFailed = (errorMsg) => ({
	type: ActionTypes.ADD_PARTNERS_FAILED,
	payload: errorMsg,
});

export const addPartners = (partners) => ({
	type: ActionTypes.ADD_PARTNERS,
	payload: partners,
});

//____________________
// FETCH Promotions
//--------------------
export const fetchPromotions = () => (dispatch) => {
	dispatch(promotionsLoading());
	return fetch(baseUrl + 'promotions')
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(`Error ${response.status}: ${response.statusText}`);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				const errorMsg = new Error(error.message);
				throw errorMsg;
			}
		)
		.then((response) => response.json())
		.then((promotions) => {
			return dispatch(addPromotions(promotions));
		})
		.catch((error) => dispatch(promotionsFailed(error.message)));
};

export const promotionsLoading = () => ({
	type: ActionTypes.PROMOTIONS_LOADING,
});

export const promotionsFailed = (errorMsg) => ({
	type: ActionTypes.PROMOTIONS_FAILED,
	payload: errorMsg,
});

export const addPromotions = (promotions) => ({
	type: ActionTypes.ADD_PROMOTIONS,
	payload: promotions,
});

// ********************************
// **	      POSTING   		 **
// ********************************
//________________
// ADD COMMENT
//----------------
export const postComment = (campsiteId, rating, author, text) => (dispatch) => {
	const newComment = {
		campsiteId: campsiteId,
		rating: rating,
		author: author,
		text: text,
	};
	newComment.date = new Date().toISOString();

	return fetch(baseUrl + 'comments', {
		method: 'POST',
		body: JSON.stringify(newComment),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(`Error ${response.status}: ${response.statusText}`);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				throw error;
			}
		)
		.then((response) => response.json())
		.then((response) => dispatch(addComment(response)))
		.catch((error) => {
			console.log('post comment', error.message);
			alert('Your comment could not be posted\nError: ' + error.message);
		});
};

export const addComment = (comment) => ({
	type: ActionTypes.ADD_COMMENT,
	payload: comment,
});

//_______________
// POST FEEDBACK
//---------------
export const postFeedback = (feedback) => (dispatch) => {
	const newFeedback = {
		firstName: feedback.firstName,
		lastName: feedback.lastName,
		phoneNum: feedback.phoneNum,
		email: feedback.email,
		agree: feedback.agree,
		contactType: feedback.contactType,
		feedback: feedback.feedback,
	};
	newFeedback.date = new Date().toISOString();

	return fetch(baseUrl + 'feedback', {
		method: 'POST',
		body: JSON.stringify(newFeedback),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(`Error ${response.status}: ${response.statusText}`);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				throw error;
			}
		)
		.catch((error) => {
			console.log('post comment', error.message);
			alert('Your comment could not be posted\nError: ' + error.message);
		});
};
