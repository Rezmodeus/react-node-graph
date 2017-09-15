import React, {Component} from 'react';
import {connect} from 'react-redux';
import Actions from './Actions';
import {Button, ButtonGroup, DropdownButton, MenuItem} from 'react-bootstrap';
import NodeGraph from './NodeGraph.react'
import NodeEdit from './NodeEdit.react'


export class PlayerView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
		};
	}

	render() {
		return (
			<div>
				<ButtonGroup vertical>

					<Button bsStyle="primary" bsSize="xsmall" title="toGraph"
					        onClick={() => this.props.setView('graph')}>Graph view</Button>
					<DropdownButton bsStyle="primary" bsSize="xsmall" title="menu" id="bg-vertical-dropdown-1"
					                onSelect={(key) => console.log('menuClick', key)}>
						<MenuItem eventKey="1">Item1</MenuItem>
						<MenuItem eventKey="2">Item2</MenuItem>
						<MenuItem eventKey="3">Item3</MenuItem>
						<MenuItem eventKey="4">Item4</MenuItem>
					</DropdownButton>
				</ButtonGroup>
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
		setView: (view) => dispatch(Actions.setView(view))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerView );

