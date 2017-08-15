import React, {Component} from 'react';
import {connect} from 'react-redux';
import Actions from './Actions';
import {Modal, Button, Form, FormControl, FormGroup, FieldGroup, ControlLabel, Col} from 'react-bootstrap';


export class QuestTextModal extends Component {

	constructor(props) {
		super(props);
		this.state = {...this.props.nodeObj};
		this.onChange = this.onChange.bind(this);
	}

	doSubmit(e) {
		e.preventDefault();
	}

	onChange(prop, e) {
		this.setState({[prop]: e.target.value});
	}

	render() {
		return (
			<Modal className="edit-modal" show={true}
			       onHide={() => this.props.hideModal()}>
				<Modal.Header>
					<Modal.Title>Edit node {this.props.selectedNode}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<h4>Text</h4>
						<FormGroup controlId="formControlsTextarea">
							<ControlLabel>Textarea</ControlLabel>
							<FormControl componentClass="textarea" placeholder="textarea"/>
						</FormGroup>
						<h4>Choices</h4>
						<FormGroup controlId="formInlineName">
							<Col sm={10}>
								<FormControl type="text" placeholder="Choice"
								             onChange={(event) => this.onChange('text', event)}
								             value={'hej'}
								/>
							</Col>
							<Col sm={2}>
								<Button bsStyle="primary" bsSize="small" title="something"
								        onClick={() => console.log('button press')}>something</Button>
							</Col>
						</FormGroup>

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
		nodeObj: state.graph.nodes[state.selectedNode]
	};
}

function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestTextModal);



