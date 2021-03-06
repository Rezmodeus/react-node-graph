import Constants from './Constants';
import Records from './Records';
import Lib from './Lib';

export default function (state, action) {
	let connections;
	let nodes;
	let questPlayerCurrentNid;
	let nodeHistory;

	switch (action.type) {
		case Constants.SET_GRAPH:
			return {
				...state,
				graph: action.graph
			};

		case Constants.SELECT_NODE:
			return {
				...state,
				selectedNode: action.nid
			};

		case Constants.DESELECT_NODE:
		// return {
		// 	...state,
		// 	selectedNode: -1
		// };

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

		case Constants.ADD_NEW_NODE:
			const newNode = Records[action.nodeType];
			nodes = [...state.graph.nodes, {
				...newNode,
				nid: state.nodeKey,
				x: 500,
				y: 100,
				type: action.nodeType,
				data: {
					...newNode.data,
					//text: 'new node'
				},
				contentType: action.nodeType
			}];

			return {
				...state,
				nodeKey: state.nodeKey + 1,
				graph: {
					...state.graph,
					nodes
				}
			};

		case Constants.UPDATE_NODE:
			nodes = state.graph.nodes.map(node => node.nid === action.node.nid
				? {...action.node}
				: {...node});
			nodes = Lib.parseAllNames(nodes);
			return {
				...state,
				graph: {
					...state.graph,
					nodes
				}
			};

		case Constants.DELETE_NODE:
			nodes = state.graph.nodes.filter(node => node.nid !== action.nid);
			return {
				...state,
				graph: {
					...state.graph,
					nodes
				}
			};

		case Constants.SET_STATE:
			return action.state;

		case Constants.MOVE_ALL_NODES:
			nodes = state.graph.nodes.map(node => {
				return {
					...node,
					x: node.x + action.pos.x,
					y: node.y + action.pos.y
				}
			});
			return {
				...state,
				graph: {
					...state.graph,
					nodes
				}
			};

		case Constants.SET_VIEW:
			questPlayerCurrentNid = action.view === 'player'
				? 1
				: state.questPlayerCurrentNid;

			nodeHistory = action.view === 'player'
				? []
				: state.nodeHistory;
			return {
				...state,
				questPlayerCurrentNid,
				nodeHistory,
				view: action.view

			};

		case Constants.STEP_BY_CHOICE:
			questPlayerCurrentNid = Lib.stepByChoice(state.questPlayerCurrentNid, action.outIndex, state.graph) || state.questPlayerCurrentNid;
			nodeHistory = questPlayerCurrentNid !== state.questPlayerCurrentNid
				? state.nodeHistory.concat([questPlayerCurrentNid])
				: state.nodeHistory;
			return {
				...state,
				nodeHistory,
				questPlayerCurrentNid

			};

		case Constants.GO_TO_HISTORY_NODE:
			questPlayerCurrentNid = state.nodeHistory[action.index];
			nodeHistory = state.nodeHistory
				.slice(0, action.index + 1);
			return {
				...state,
				nodeHistory,
				questPlayerCurrentNid
			};

		default:
			return state;

	}
}

