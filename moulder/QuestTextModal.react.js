import React, {Component} from 'react';
import {connect} from 'react-redux';
import Actions from './Actions';
import {Modal, ModalHeader, ModalTitle, ModalBody,} from 'react-bootstrap';


export class QuestTextModal extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Modal className="edit-modal" show={true}
			       onHide={() => this.props.hideModal()}>
				<Modal.Header>
					<Modal.Title>Edit node</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h4>General</h4>
					{this.props.selectedNode}
					<h4>Permissions</h4>
				</Modal.Body>
			</Modal>
		);
	}
}

function mapStateToProps(state) {
	return {
		selectedNode: state.selectedNode
	};
}

function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestTextModal);



