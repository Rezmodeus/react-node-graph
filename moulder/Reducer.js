import Constants from './Constants';

export default function (state, action) {
	let connections;
	let nodes;
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

		case Constants.SET_NODE_POS:
			nodes = state.graph.nodes.map(node => node.nid === action.nid
				? {
					...node,
					x: action.pos.left,
					y: action.pos.top
				}
				: node);
			return {
				...state,
				nodeMoving: -1,
				graph: {
					...state.graph,
					nodes
				}
			};

		case Constants.NEW_CONNECTOR:
			connections = [...state.graph.connections, {
				from_node: action.fromNode,
				from: action.fromPin,
				to_node: action.toNode,
				to: action.toPin
			}];
			return {
				...state,
				graph: {
					...state.graph,
					connections
				}
			};

		case Constants.REMOVE_CONNECTOR:
			connections = [...state.graph.connections];
			connections = connections.filter((connection) => connection !== action.connector);
			return {
				...state,
				graph: {
					...state.graph,
					connections
				}
			};

		default:
			return state;

	}
}

