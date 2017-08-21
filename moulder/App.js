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
	}

	showModal() {
		this.setState({showModal: true});
	}

	hideModal() {
		this.setState({showModal: false});
	}

	getFromLocalStorage(){
		const state = localStorage.getItem('saveData');
		this.props.setState(JSON.parse(state));
	}

	saveToLocalStorage(){
		localStorage.setItem('saveData',JSON.stringify(this.props.allState));
	}

	render() {

		return (
			<div>
				<Button bsStyle="primary" bsSize="xsmall" title="addNewNode"
				        onClick={() => this.props.addNewNode()}>new QuestText</Button>
				<Button bsStyle="primary" bsSize="xsmall" title="editButton"
				        onClick={() => this.showModal()}>edit node</Button>
				<Button bsStyle="primary" bsSize="xsmall" title="editButton"
				        onClick={() => this.saveToLocalStorage()}>save</Button>
				<Button bsStyle="primary" bsSize="xsmall" title="editButton"
				        onClick={() => this.getFromLocalStorage()}>load</Button>
				{this.state.showModal
					? <NodeEdit hideModal={this.hideModal}/>
					: null}
				<NodeGraph/>
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
		setState: (state) => dispatch(Actions.setState(state))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


