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

		const nodeEditPayload = {
			selected: this.props.nodes.find(node => node.nid === this.props.selectedNode),
			hideModal: this.hideModal
		};

		return (
			<div>
				<Button bsStyle="primary" bsSize="xsmall" title="addNewNode"
				        onClick={() => this.props.addNewNode('questText')}>new QuestText</Button>
				<Button bsStyle="primary" bsSize="xsmall" title="addNewNode"
				        onClick={() => this.props.addNewNode('response')}>new Response</Button>
				<Button bsStyle="primary" bsSize="xsmall" title="addNewNode"
				        onClick={() => this.props.addNewNode('condition')}>new Condition</Button>
				<Button bsStyle="primary" bsSize="xsmall" title="addNewNode"
				        onClick={() => this.props.addNewNode('entity')}>new Entity</Button>
				<Button bsStyle="primary" bsSize="xsmall" title="addNewNode"
				        onClick={() => this.props.addNewNode('npc')}>new Npc</Button>
				<Button bsStyle="primary" bsSize="xsmall" title="addNewNode"
				        onClick={() => this.props.addNewNode('item')}>new Item</Button>
				<Button bsStyle="primary" bsSize="xsmall" title="addNewNode"
				        onClick={() => this.props.addNewNode('location')}>new Location</Button>
				<Button bsStyle="primary" bsSize="xsmall" title="addNewNode"
				        onClick={() => this.showModal()}>edit node</Button>
				<Button bsStyle="primary" bsSize="xsmall" title="editButton"
				        onClick={() => this.saveToLocalStorage()}>save</Button>
				<Button bsStyle="primary" bsSize="xsmall" title="editButton"
				        onClick={() => this.clearState()}>clear</Button>
				<Button bsStyle="primary" bsSize="xsmall" title="editButton"
				        onClick={() => this.getFromLocalStorage()}>load</Button>
				{this.state.showModal
					? <NodeEdit {...nodeEditPayload}/>
					: null}
				<NodeGraph {...nodeGraphPayload}/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		nodes: state.graph.nodes,
		selectedNode: state.selectedNode,
		allState: state
	};
}

function mapDispatchToProps(dispatch) {
	return {
		addNewNode: (nodeType) => dispatch(Actions.addNewNode(nodeType)),
		setState: (state) => dispatch(Actions.setState(state)),
		moveAllNodes: (pos) => dispatch(Actions.moveAllNodes(pos))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


