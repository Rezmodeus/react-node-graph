import React, {Component} from 'react';
import {connect} from 'react-redux';
import Actions from './Actions';
import {Modal, Button, Form, FormControl, FormGroup, FieldGroup, ControlLabel, Col} from 'react-bootstrap';


export class QuestTextModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			nodeObj: {...this.getClonedNode()}
		};
		this.onChangeChoiceText = this.onChangeChoiceText.bind(this);
	}

	componentWillMount() {
		this.setState({
			nodeObj: {...this.getClonedNode()}
		});
	}

	getClonedNode(){
		return  JSON.parse(JSON.stringify(this.props.nodes.find(node => node.nid === this.props.selectedNode)));
	}

	doSubmit(e) {
		e.preventDefault();
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
		console.log(this.state)
		console.log(this.props)
		const outFields = this.state.nodeObj.fields.out.map((out, index) =>
			<FormGroup key={out.name} controlId="formInlineName">
				<Col sm={10}>
					<FormControl type="text" placeholder="Choice"
					             onChange={(event) => this.onChangeChoiceText(index, event)}
					             value={out.str}
					/>
				</Col>
				<Col sm={2}>
					<Button bsStyle="primary" bsSize="small" title="something"
					        onClick={() => console.log('button press')}>something</Button>
				</Col>
			</FormGroup>
		);
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
						        onClick={() => console.log('add choice')}>Add choice</Button>
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



