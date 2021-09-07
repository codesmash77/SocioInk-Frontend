/* eslint-disable */
import {
	SET_INKS,
	LOADING_DATA,
	LIKE_INK,
	UNLIKE_INK,
	DELETE_INK,
	SET_ERRORS,
	POST_INK,
	CLEAR_ERRORS,
	LOADING_UI,
	SET_INK,
	STOP_LOADING_UI,
	SUBMIT_COMMENT
} from '../types';

import axios from 'axios';

export const getInks = () => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios
		.get('/inks')
		.then((res) => {
			dispatch({
				type: SET_INKS,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_INKS,
				payload: []
			});
		});
};

export const getInk = (inkId) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	axios
		.get(`/ink/${inkId}`)
		.then((res) => {
			dispatch({
				type: SET_INK,
				payload: res.data
			});
			dispatch({ type: STOP_LOADING_UI });
		})
		.catch((err) => console.log(err));
};

// Post a ink
export const postInk = (newInk) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	axios
		.post('/ink', newInk)
		.then((res) => {
			dispatch({
				type: POST_INK,
				payload: res.data
			});
			dispatch(clearErrors());
		})
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
		});
};

// Like a ink
export const likeInk = (inkId) => (dispatch) => {
	axios
		.get(`/ink/${inkId}/like`)
		.then((res) => {
			dispatch({
				type: LIKE_INK,
				payload: res.data
			});
		})
		.catch((err) => console.log(err));
};

// Unlike a ink
export const unlikeInk = (inkId) => (dispatch) => {
	axios
		.get(`/ink/${inkId}/unlike`)
		.then((res) => {
			dispatch({
				type: UNLIKE_INK,
				payload: res.data
			});
		})
		.catch((err) => console.log(err));
};

// Submit a comment
export const submitComment = (inkId, commentData) => (dispatch) => {
	axios
		.post(`/ink/${inkId}/comment`, commentData)
		.then((res) => {
			dispatch({
				type: SUBMIT_COMMENT,
				payload: res.data
			});
			dispatch(clearErrors());
		})
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
		});
};

export const deleteInk = (inkId) => (dispatch) => {
	axios
		.delete(`/ink/${inkId}`)
		.then(() => {
			dispatch({ type: DELETE_INK, payload: inkId });
		})
		.catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios
		.get(`/user/${userHandle}`)
		.then((res) => {
			dispatch({
				type: SET_INKS,
				payload: res.data.inks
			});
		})
		.catch(() => {
			dispatch({
				type: SET_INKS,
				payload: null
			});
		});
};

export const clearErrors = () => (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};

export const uploadInkImage = (formData,inkId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post(`/ink/${inkId}`, formData)
    .then((res) => {
		console.log("ink image changed")
			dispatch({
				type: POST_INK,
				payload: res.data
			});
			dispatch(clearErrors());
		})
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
		});
};