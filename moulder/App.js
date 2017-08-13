import React, {Component} from 'react';
import {connect} from 'react-redux';
import Actions from './Actions';
import {Button} from 'react-bootstrap';
import NodeGraph from './NodeGraph.react'


export class App extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	onNewNode() {
	}


	render() {
		return (
			<div>
				<Button bsStyle="primary" bsSize="xsmall" title="addNewNode"
				        onClick={() => this.props.addNewNode()}>new QuestText</Button>
				<NodeGraph/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		addNewNode: () => dispatch(Actions.addNewNode())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


