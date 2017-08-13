import React, {Component} from 'react';
import {connect} from 'react-redux';
import Actions from './Actions';

// import ReactNodeGraph from 'react-node-graph';

import ReactNodeGraph from '../src/';

export class NodeGraph extends Component {

	constructor(props) {
		super(props);
		this.state = {startPos: {x: 0, y: 0}};
	}

	onNewConnector(fromNode, fromPin, toNode, toPin) {
		this.props.newConnector(fromNode, fromPin, toNode, toPin);
	}

	onRemoveConnector(connector) {
		this.props.removeConnector(connector);
	}

	onNodeMove(nid, pos) {
		if (this.state.startPos.x !== pos.left || this.state.startPos.y !== pos.top) {
			// only set pos if not double click, ie no move
			this.props.setNodePos(nid, pos);
		}
	}

	onNodeStartMove(nid) {
		const node = this.props.graph.nodes.find(node => node.nid === nid);
		this.setState({startPos: {x: node.x, y: node.y}});
	}

	handleNodeSelect(nid) {
		this.props.selectNode(nid);
	}

	handleNodeDeselect(nid) {
		this.props.deSelectNode();
	}

	render() {
		return (
			<ReactNodeGraph
				data={this.props.graph}
				onNodeMove={(nid, pos) => this.onNodeMove(nid, pos)}
				onNodeStartMove={(nid) => this.onNodeStartMove(nid)}
				onNewConnector={(n1, o, n2, i) => this.onNewConnector(n1, o, n2, i)}
				onRemoveConnector={(connector) => this.onRemoveConnector(connector)}
				onNodeSelect={(nid) => {
					this.handleNodeSelect(nid)
				}}
				onNodeDeselect={(nid) => {
					this.handleNodeDeselect(nid)
				}}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		graph: state.graph
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setGraph: (graph) => dispatch(Actions.setGraph(graph)),
		selectNode: (nid) => dispatch(Actions.selectNode(nid)),
		deSelectNode: () => dispatch(Actions.deSelectNode()),
		newConnector: (fromNode, fromPin, toNode, toPin) => dispatch(Actions.newConnector(fromNode, fromPin, toNode, toPin)),
		removeConnector: (connector) => dispatch(Actions.removeConnector(connector)),
		setNodePos: (nid, pos) => dispatch(Actions.setNodePos(nid, pos))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeGraph);


