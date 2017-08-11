import Constants from './Constants';

export default {
	setGraph(graph) {
		return {
			type: Constants.SET_GRAPH,
			graph
		};
	},

	selectNode(nid) {
		return {
			type: Constants.SELECT_NODE,
			nid
		}
	},

	deSelectNode() {
		return {
			type: Constants.DESELECT_NODE
		}
	}

}

