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


export class QuestTextModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			nodeObj: {...this.getClonedNode()}
		};
		this.onChangeChoiceText = this.onChangeChoiceText.bind(this);
		this.addChoice = this.addChoice.bind(this);
	}

	componentWillMount() {
		this.setState({
			nodeObj: {...this.getClonedNode()}
		});
	}

	getClonedNode() {
		return JSON.parse(JSON.stringify(this.props.nodes.find(node => node.nid === this.props.selectedNode)));
	}

	doSubmit(e) {
		e.preventDefault();
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

	render() {
		// console.log(this.state.nodeObj.fields.out);
		const outFields = this.state.nodeObj.fields.out.map((out, index) => {
			const upEnabled = index > 0;
			const downEnabled = index < this.state.nodeObj.fields.out.length - 1;
			return (<FormGroup key={out.name} controlId="formInlineName">
				<Col sm={8}>
					<FormControl type="text" placeholder="Choice"
					             onChange={(event) => this.onChangeChoiceText(index, event)}
					             value={out.str}
					/>
				</Col>
				<Col sm={4}>
					<ButtonToolbar>
						<Button disabled={!upEnabled} bsStyle="primary" bsSize="xsmall" title="up"
						        onClick={() => console.log('button press')}>up</Button>
						<Button disabled={!downEnabled} bsStyle="primary" bsSize="xsmall" title="something"
						        onClick={() => console.log('button press')}>down</Button>
						<Button bsStyle="danger" bsSize="xsmall" title="something"
						        onClick={() => console.log('button press')}>Delete</Button>
					</ButtonToolbar>
				</Col>
			</FormGroup>)
		});
		return (
			<Modal className="edit-modal" show={true}
			       onHide={() => this.props.hideModal()}>
				<Modal.Header>
					<Modal.Title>Edit node {this.props.selectedNode}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup controlId="formControlsTextarea">
							<ControlLabel>Text</ControlLabel>
							<FormControl componentClass="textarea" placeholder="textarea"/>
						</FormGroup>
						<h4>Choices</h4>
						{outFields}
						<Button block bsStyle="primary" bsSize="small" title="something"
						        onClick={() => this.addChoice()}>Add choice</Button>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<h4>Footer</h4>
				</Modal.Footer>

			</Modal>
		);
	}
}

function mapStateToProps(state) {
	return {
		selectedNode: state.selectedNode,
		nodes: state.graph.nodes
	};
}

function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestTextModal);



