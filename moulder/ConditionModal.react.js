import React, {Component} from 'react';
import {connect} from 'react-redux';
import Actions from './Actions';
import Lib from './Lib'
import {
	Modal,
	Button,
	ButtonToolbar,
	Form,
	FormControl,
	FormGroup,
	FieldGroup,
	ControlLabel,
	Col,
	label
} from 'react-bootstrap';


export class ConditionModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			nodeObj: {...this.getClonedNode()},
			hasConnectedChoices: this.props.connections.filter(con => con.from_node === this.props.selectedNode).length > 0,
			nodeConnected: this.props.connections.filter(con => con.to_node === this.props.selectedNode).length > 0,
		};
		this.onChangeMainText = this.onChangeMainText.bind(this);
		this.onChangeChoiceText = this.onChangeChoiceText.bind(this);
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

	onChangeMainText(e) {
		this.setState({nodeObj: Lib.setMainText(this.props.nodes, this.state.nodeObj, e.target.value)});
	}

	onChangeChoiceText(index, e) {
		const outs = [...this.state.nodeObj.fields.out];
		outs[index].str = e.target.value;
		this.setState({
			nodeObj: {
				...this.state.nodeObj,
				fields: {
					...this.state.nodeObj.fields,
					out: [...outs]
				}
			}
		});
	}

	deleteNode() {
		this.props.deleteNode(this.props.selectedNode);
		this.props.hideModal();
	}

	render() {
		// console.log(this.state.nodeObj.fields.out);
		const outFields = this.state.nodeObj.fields.out.map((out, index) => {
			if(index === 0){
			return (<FormGroup key={out.name} controlId="formInlineName">
				<Col sm={8}>
					<FormControl type="text" placeholder="Choice"
					             onChange={(event) => this.onChangeChoiceText(index, event)}
					             value={out.str}
					/>
				</Col>
			</FormGroup>)
			} else {
				return <div key={out.name}>hej</div>
			}
		});

		const deleteEnabled = !this.state.hasConnectedChoices && !this.state.nodeConnected;
		return (
			<Modal className="edit-modal" show={true}
			       onHide={() => this.hideModal()}>
				<Modal.Header>
					<Modal.Title>Condition node {this.props.selectedNode}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup controlId="formControlsTextarea">
							<ControlLabel>Text: {this.state.nodeObj.type}</ControlLabel>
							<FormControl componentClass="textarea" placeholder="textarea"
							             onChange={(event) => this.onChangeMainText(event)}
							             value={this.state.nodeObj.data.text}
							/>
						</FormGroup>
						<h4>Choices</h4>
						{outFields}
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

export default connect(mapStateToProps, mapDispatchToProps)(ConditionModal);



