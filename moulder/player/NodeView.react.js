import React, {Component} from 'react';
import {connect} from 'react-redux';
import Actions from '../Actions';
import {Well, ListGroup, ListGroupItem} from 'react-bootstrap';

export class NodeView extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	onClick(index) {
		console.log('click',index);

	}

	render() {
		const node = this.props.nodes.find(n =>n.nid === this.props.questPlayerCurrentNid);
		if(!node) {
			return (<Well>no node with nid:{this.props.questPlayerCurrentNid}</Well>);
		}
		if(node.contentType !== 'questText'){
			return (<Well>no questText node, nid:{this.props.questPlayerCurrentNid}</Well>);
		}
		const choices = node.fields.out.map((out,index) => <ListGroupItem key={out.str} onClick={() => this.onClick(index)}>{out.str}</ListGroupItem>);
		return (
			<div>
				<Well>
					<h3>{node.type}</h3>
					<ListGroup>
						{choices}
					</ListGroup>


				</Well>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		nodes: state.graph.nodes,
		questPlayerCurrentNid: state.questPlayerCurrentNid
	};
}

function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeView);


