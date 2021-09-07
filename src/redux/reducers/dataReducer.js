/* eslint-disable */
import {
	SET_INKS,
	LIKE_INK,
	UNLIKE_INK,
	LOADING_DATA,
	DELETE_INK,
	POST_INK,
	SET_INK,
	SUBMIT_COMMENT
} from '../types';

const initialState = {
	inks: [],
	ink: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true
			};
		case SET_INKS:
			return {
				...state,
				inks: action.payload,
				loading: false
			};
		case SET_INK:
			return {
				...state,
				ink: action.payload
			};
		case LIKE_INK:
		case UNLIKE_INK:
			let index = state.inks.findIndex((ink) => ink.inkId === action.payload.inkId);
			state.inks[index] = action.payload;
			if (state.ink.inkId === action.payload.inkId) {
				state.ink = action.payload;
			}
			return {
				...state
			};
		case DELETE_INK:
			index = state.inks.findIndex((ink) => ink.inkId === action.payload);
			state.inks.splice(index, 1);
			return {
				...state
			};
		case POST_INK:
			return {
				...state,
				inks: [ action.payload, ...state.inks ]
			};
		case SUBMIT_COMMENT:
			return {
				...state,
				ink: {
					...state.ink,
					comments: [ action.payload, ...state.ink.comments ]
				}
			};
		default:
			return state;
	}
}