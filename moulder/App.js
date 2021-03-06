import React, {Component} from 'react';
import {connect} from 'react-redux';
import GraphView from './GraphView.react'
import QuestPlayer from './player/QuestPlayer.react'


export class App extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {

		let view = null;
		switch (this.props.view) {
			case 'graph':
				view = <GraphView/>;
				break;
			case 'player':
				view = <QuestPlayer/>;
				break;
		}

		return (
			<div>
				{view}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		view: state.view
	};
}

function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


