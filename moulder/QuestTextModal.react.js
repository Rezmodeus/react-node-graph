import React, {Component} from 'react';
import {connect} from 'react-redux';
import Actions from './Actions';
import Records from './Records';
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
	Col
} from 'react-bootstrap';


export class QuestTextModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			nodeObj: {...this.getClonedNode()},
			connectedChoices: this.props.connections.filter(con => con.from_node === this.props.selectedNode).map(con => con.from),
			nodeConnected: this.props.connections.filter(con => con.to_node === this.props.selectedNode).length > 0,
		};
		this.onChangeMainText = this.onChangeMainText.bind(this);
		this.onChangeChoiceText = this.onChangeChoiceText.bind(this);
		this.addChoice = this.addChoice.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.moveChoice = this.moveChoice.bind(this);
		this.deleteChoice = this.deleteChoice.bind(this);
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

	addChoice() {
		const biggestKeyNr = this.state.nodeObj.fields.out.reduce((max, choice) => Math.max(max, parseInt(choice.name)), 0);
		const name = (biggestKeyNr + 1) + '';
		const choice = {
			...Records.choice,
			name
		};
		this.setState({
			nodeObj: {
				...this.state.nodeObj,
				fields: {
					...this.state.nodeObj.fields,
					out: this.state.nodeObj.fields.out.concat([choice])
				}
			}
		});

	}

	hideModal() {
		this.props.updateNode(this.state.nodeObj);
		this.props.hideModal();
	}


	onChangeMainText(e) {
		this.setState({nodeObj: Lib.setMainText(this.props.nodes, this.state.nodeObj, e.target.value)});
	}

	onChangeChoiceText(index, e) {
		this.setState({nodeObj: Lib.setOutText(this.props.nodes, this.state.nodeObj, index, e.target.value)});
	}

	moveChoice(index, direction) {
		const outs = [...this.state.nodeObj.fields.out];
		const moveTo = outs[index + direction];
		outs[index + direction] = outs[index];
		outs[index] = moveTo;
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

	deleteChoice(name) {
		const outs = this.state.nodeObj.fields.out.filter(out => out.name !== name);
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
		const outFields = this.state.nodeObj.fields.out.map((out, index) => {
			const upEnabled = index > 0;
			const downEnabled = index < this.state.nodeObj.fields.out.length - 1;
			const deleteEnabled = this.state.connectedChoices.indexOf(out.name) === -1;
			return (<FormGroup key={out.name} controlId="formInlineName">
				<Col sm={8}>
					<ControlLabel>Text: {out.str}</ControlLabel>
					<FormControl type="text" placeholder="Choice"
					             onChange={(event) => this.onChangeChoiceText(index, event)}
					             value={out.strRaw}
					/>
				</Col>
				<Col sm={4}>
					<ButtonToolbar className="choice-button-group">
						<Button disabled={!upEnabled} bsStyle="primary" bsSize="xsmall" title="up"
						        onClick={() => this.moveChoice(index, -1)}>up</Button>
						<Button disabled={!downEnabled} bsStyle="primary" bsSize="xsmall" title="something"
						        onClick={() => this.moveChoice(index, 1)}>down</Button>
						<Button disabled={!deleteEnabled} bsStyle="danger" bsSize="xsmall" title="something"
						        onClick={() => this.deleteChoice(out.name)}>Delete</Button>
					</ButtonToolbar>
				</Col>
			</FormGroup>)
		});

		const deleteEnabled = !this.state.nodeConnected && this.state.nodeObj.fields.out.length === 0;
		return (
			<Modal className="edit-modal" show={true}
			       onHide={() => this.hideModal()}>
				<Modal.Header>
					<Modal.Title>QuestText node {this.props.selectedNode}</Modal.Title>
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
						<Button block bsStyle="primary" bsSize="small" title="something"
						        onClick={() => this.addChoice()}>Add choice</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestTextModal);



