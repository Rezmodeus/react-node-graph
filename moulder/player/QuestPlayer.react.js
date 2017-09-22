import React, {Component} from 'react';
import {connect} from 'react-redux';
import Actions from '../Actions';
import {Button, ButtonGroup, DropdownButton, MenuItem, Col, Well} from 'react-bootstrap';
import NodeView from '../player/NodeView.react'
import EntitiesView from '../player/EntitiesView.react'
import GameStateView from '../player/GameStateView.react'
import {NodeGraph} from "../NodeGraph.react";


export class QuestPlayer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
		};
	}

	render() {
		return (
			<div>
				<Col sm={1}>
				<ButtonGroup vertical>

					<Button bsStyle="warning" bsSize="xsmall" title="toGraph"
					        onClick={() => this.props.setView('graph')}>Graph view</Button>
					<Button bsStyle="primary" bsSize="xsmall" title="play"
					        onClick={() => console.log()}>play</Button>
					<Button bsStyle="primary" bsSize="xsmall" title="stop"
					        onClick={() => console.log()}>stop</Button>
					<DropdownButton bsStyle="primary" bsSize="xsmall" title="menu" id="bg-vertical-dropdown-1"
					                onSelect={(key) => console.log('menuClick', key)}>
						<MenuItem eventKey="1">Item1</MenuItem>
						<MenuItem eventKey="2">Item2</MenuItem>
						<MenuItem eventKey="3">Item3</MenuItem>
						<MenuItem eventKey="4">Item4</MenuItem>
					</DropdownButton>
				</ButtonGroup>
				</Col>
				<Col sm={3}>
					<NodeView/>
				</Col>
				<Col sm={5}>
					<EntitiesView/>
				</Col>
				<Col sm={3}>
				<GameStateView/>
				</Col>

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

export default connect(mapStateToProps, mapDispatchToProps)(QuestPlayer);


