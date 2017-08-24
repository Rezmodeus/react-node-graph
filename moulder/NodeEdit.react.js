import React, {Component} from 'react';
import QuestTextModal from './QuestTextModal.react'
import ResponseModal from './ResponseModal.react'

export default class NodeEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let modal = null;
		switch (this.props.selected.contentType) {
			case 'questText':
				modal = <QuestTextModal {...this.props}/>;
				break;
			case 'response':
				modal = <ResponseModal {...this.props}/>;
				break;
			default:
				break;

		}
		return (
			<div>
				{modal}
			</div>
		);
	}
}
