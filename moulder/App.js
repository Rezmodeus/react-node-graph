import React, {Component} from 'react';
import {connect} from 'react-redux';
import Actions from './Actions';

// import ReactNodeGraph from 'react-node-graph'; 

import ReactNodeGraph from '../src/';

export class App extends Component {

	constructor(props) {
		super(props);
		this.state = {...this.props.graph};//exampleGraph;
	}

	onNewConnector(fromNode, fromPin, toNode, toPin) {
		let connections = [...this.state.connections, {
			from_node: fromNode,
			from: fromPin,
			to_node: toNode,
			to: toPin
		}]

		this.setState({connections: connections})
	}

	onRemoveConnector(connector) {
		let connections = [...this.state.connections]
		connections = connections.filter((connection) => {
			return connection != connector
		})

		this.setState({connections: connections})
	}

	onNodeMove(nid, pos) {
		console.log('end move : ' + nid, pos)
	}

	onNodeStartMove(nid) {
		console.log('start move : ' + nid)
	}

	handleNodeSelect(nid) {
		console.log('node selected : ' + nid)
		this.props.selectNode(nid);
	}

	handleNodeDeselect(nid) {
		console.log('node deselected : ' + nid)
		this.props.deSelectNode();
	}

	render() {
		return (
			<ReactNodeGraph
				data={this.state}
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
		deSelectNode: () => dispatch(Actions.deSelectNode())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


