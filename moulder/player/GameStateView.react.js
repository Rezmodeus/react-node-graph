import React, {Component} from 'react';
import {connect} from 'react-redux';
import Actions from '../Actions';
import {Button, ButtonGroup, DropdownButton, MenuItem, Col, Well} from 'react-bootstrap';
import NodeGraph from '../NodeGraph.react'
import NodeEdit from '../NodeEdit.react'


export class GameStateView extends Component {

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<div>

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

export default connect(mapStateToProps, mapDispatchToProps)(GameStateView);


