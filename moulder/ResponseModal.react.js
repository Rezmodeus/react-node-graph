import React, {Component} from 'react';
import {connect} from 'react-redux';
import Actions from './Actions';
import Records from './Records';
import {
	Modal,
	Button,
	ButtonToolbar,
	Form,
	FormControl,
	FormGroup,
	FieldGroup,
	ControlLabel,
	Col
} from 'react-bootstrap';


export class ResponseModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			nodeObj: {...this.getClonedNode()},
			hasConnectedChoices: this.props.connections.filter(con => con.from_node === this.props.selectedNode).length > 0,
			nodeConnected: this.props.connections.filter(con => con.to_node === this.props.selectedNode).length > 0,
		};
		this.onChangeQuestText = this.onChangeQuestText.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.deleteNode = this.deleteNode.bind(this);
	}

	componentWillMount() {
		this.setState({
			nodeObj: {...this.getClonedNode()}
		});
	}

	getClonedNode() {
		return JSON.parse(JSON.stringify(this.props.nodes.find(node => node.nid === this.props.selectedNode)));
	}

	hideModal() {
		this.props.updateNode(this.state.nodeObj);
		this.props.hideModal();
	}

	onChangeQuestText(e) {
		this.setState({
			nodeObj: {
				...this.state.nodeObj,
				type: e.target.value

			}
		});
	}

	deleteNode() {
		this.props.deleteNode(this.props.selectedNode);
		this.props.hideModal();
	}

	render() {

		const deleteEnabled = !this.state.hasConnectedChoices && !this.state.nodeConnected;
		return (
			<Modal className="edit-modal" show={true}
			       onHide={() => this.hideModal()}>
				<Modal.Header>
					<Modal.Title>Edit node {this.props.selectedNode}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup controlId="formControlsTextarea">
							<ControlLabel>Text</ControlLabel>
							<FormControl componentClass="textarea" placeholder="textarea"
							             onChange={(event) => this.onChangeQuestText(event)}
							             value={this.state.nodeObj.type}
							/>
						</FormGroup>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button disabled={!deleteEnabled} bsStyle="danger" bsSize="xsmall" title="something"
					        onClick={() => this.deleteNode()}>Delete node</Button>
				</Modal.Footer>

			</Modal>
		);
	}
}

function mapStateToProps(state) {
	return {
		selectedNode: state.selectedNode,
		nodes: state.graph.nodes,
		connections: state.graph.connections
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updateNode: (node) => dispatch(Actions.updateNode(node)),
		deleteNode: (nid) => dispatch(Actions.deleteNode(nid))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponseModal);



