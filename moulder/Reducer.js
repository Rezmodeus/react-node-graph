import Constants from './Constants';

export default function (state, action) {
	switch (action.type) {
		case Constants.SET_GRAPH:
			return {
				...state,
				graph: action.graph
			};
		case Constants.SELECT_NODE:
			return state;
		case Constants.DESELECT_NODE:
			return state;

		default:
			return state;

	}
}

