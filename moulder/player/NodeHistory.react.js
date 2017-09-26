import React, {Component} from 'react';
import {connect} from 'react-redux';
import Actions from '../Actions';
import {Breadcrumb, BreadcrumbItem} from 'react-bootstrap';


export class NodeHistory extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
		};
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

	clearState() {
		this.props.setState({graph: {nodes: [], connections: []}});
	}

	rewind() {

	}


	render() {
		console.log(this.props)
		const len = this.props.nodeHistory.length
		const breadCrumbs = this.props.nodeHistory.map((nodeId, index) => {
			const node = this.props.nodes.find(node => node.nid === nodeId);
			console.log(nodeId, node)
			return (
				<Breadcrumb.Item key={nodeId} active={index === len - 1}
				                 onClick={() => this.props.goToHistoryNode(index)}>
					{node.type}
				</Breadcrumb.Item>
			)

		});
		return (
			<div>
				<Breadcrumb>
					{breadCrumbs}
				</Breadcrumb>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		nodes: state.graph.nodes,
		nodeHistory: state.nodeHistory
	};
}

function mapDispatchToProps(dispatch) {
	return {
		goToHistoryNode: (index) => dispatch(Actions.goToHistoryNode(index))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeHistory);


