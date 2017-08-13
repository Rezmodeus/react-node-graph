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
	},

	setNodePos(nid, pos) {
		return {
			type: Constants.SET_NODE_POS,
			nid,
			pos
		}
	},

	newConnector(fromNode, fromPin, toNode, toPin) {
		return {
			type: Constants.NEW_CONNECTOR,
			fromNode,
			fromPin,
			toNode,
			toPin
		}
	},

	removeConnector(connector) {
		return {
			type: Constants.REMOVE_CONNECTOR,
			connector
		}
	},

	addNewNode() {
		return {
			type: Constants.ADD_NEW_NODE,
		}

	}

}

