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

	addNewNode(nodeType) {
		return {
			type: Constants.ADD_NEW_NODE,
			nodeType
		}
	},

	updateNode(node) {
		return {
			type: Constants.UPDATE_NODE,
			node
		}
	},

	deleteNode(nid) {
		return {
			type: Constants.DELETE_NODE,
			nid
		}
	},

	setState(state) {
		return {
			type: Constants.SET_STATE,
			state
		}
	},

	moveAllNodes(pos) {
		return {
			type: Constants.MOVE_ALL_NODES,
			pos
		}
	},

	setView(view) {
		return {
			type: Constants.SET_VIEW,
			view
		}
	},

	stepByChoice(outIndex) {
		return {
			type: Constants.STEP_BY_CHOICE,
			outIndex
		}
	},

	goToHistoryNode(index) {
		return {
			type: Constants.GO_TO_HISTORY_NODE,
			index
		}

	}
}

