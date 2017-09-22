import React, {Component} from 'react';
import {connect} from 'react-redux';
import Actions from '../Actions';
import {Well} from 'react-bootstrap';

export class NodeView extends Component {

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<div>
				<Well>NodeView</Well>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
	};
}

function mapDispatchToProps(dispatch) {
	return {
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeView);


