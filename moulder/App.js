import React, {Component} from 'react';
import {connect} from 'react-redux';
import Actions from './Actions';
import {Button} from 'react-bootstrap';
import NodeGraph from './NodeGraph.react'
import NodeEdit from './NodeEdit.react'


export class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
		};
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.getFromLocalStorage = this.getFromLocalStorage.bind(this);
		this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
		this.clearState = this.clearState.bind(this);
		this.moronicUpdate = this.moronicUpdate.bind(this);
		this.onEndPan = this.onEndPan.bind(this);
	}

	showModal() {
		this.setState({showModal: true});
	}

	hideModal() {
		this.setState({showModal: false});
	}

	clearState() {
		this.props.setState({graph: {nodes: [], connections: []}});
	}

	getFromLocalStorage() {
		this.clearState();
		setTimeout(() => {
			const state = JSON.parse(localStorage.getItem('saveData'));
			this.props.setState(state);
		}, 100);
	}

	saveToLocalStorage() {
		localStorage.setItem('saveData', JSON.stringify(this.props.allState));
	}

	moronicUpdate() {
		setTimeout(() => {
			const prevState = this.props.allState;
			this.clearState();
			setTimeout(() => {
				this.props.setState(prevState);
			}, 20);
		}, 20);
	}

	onEndPan(pos) {
		this.props.moveAllNodes(pos);
		this.moronicUpdate();
	}


	render() {
		const nodeGraphPayload = {
			onEndPan: this.onEndPan
		};

		return (
			<div>
				<Button bsStyle="primary" bsSize="xsmall" title="addNewNode"
				        onClick={() => this.props.addNewNode()}>new QuestText</Button>
				<Button bsStyle="primary" bsSize="xsmall" title="editButton"
				        onClick={() => this.showModal()}>edit node</Button>
				<Button bsStyle="primary" bsSize="xsmall" title="editButton"
				        onClick={() => this.saveToLocalStorage()}>save</Button>
				<Button bsStyle="primary" bsSize="xsmall" title="editButton"
				        onClick={() => this.clearState()}>clear</Button>
				<Button bsStyle="primary" bsSize="xsmall" title="editButton"
				        onClick={() => this.getFromLocalStorage()}>load</Button>
				{this.state.showModal
					? <NodeEdit hideModal={this.hideModal}/>
					: null}
				<NodeGraph {...nodeGraphPayload}/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		allState: state
	};
}

function mapDispatchToProps(dispatch) {
	return {
		addNewNode: () => dispatch(Actions.addNewNode()),
		setState: (state) => dispatch(Actions.setState(state)),
		moveAllNodes: (pos) => dispatch(Actions.moveAllNodes(pos))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


