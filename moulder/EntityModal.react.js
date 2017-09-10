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
	Col
} from 'react-bootstrap';


export class EntityModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			nodeObj: {...this.getClonedNode()},
			hasConnectedChoices: this.props.connections.filter(con => con.from_node === this.props.selectedNode).length > 0,
			nodeConnected: this.props.connections.filter(con => con.to_node === this.props.selectedNode).length > 0,
		};
		this.onChangeData = this.onChangeData.bind(this);
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

	onChangeData(key, e) {
		// const nodeObjUpdated = Lib.setMainText(this.props.nodes, this.state.nodeObj, this.state.nodeObj.data.text);
		const nodeObjUpdated = {...this.state.nodeObj};
		const data = {...this.state.nodeObj.data};
		data[key] = e.target.value;
		const newText = key === 'name' ? e.target.value : nodeObjUpdated.type;
		this.setState({
			nodeObj: {
				...nodeObjUpdated,
				data: data,
				type: newText
			}
		});
	}

	deleteNode() {
		this.props.deleteNode(this.props.selectedNode);
		this.props.hideModal();
	}

	render() {
		// console.log(this.state.nodeObj.fields.out);
		const data = this.state.nodeObj.data;
		const dataElements = Object.keys(data).map((key, index) => {
			return (<FormGroup key={index} controlId="formInlineName">
				<Col sm={4}>
					{key + ':'}
				</Col>
				<Col sm={8}>
					<FormControl type="text" placeholder="nothing"
					             onChange={(event) => this.onChangeData(key, event)}
					             value={data[key]}
					/>
				</Col>
			</FormGroup>)
		});

		const deleteEnabled = !this.state.hasConnectedChoices && !this.state.nodeConnected;
		return (
			<Modal className="edit-modal" show={true}
			       onHide={() => this.hideModal()}>
				<Modal.Header>
					<Modal.Title>Entity {this.props.selectedNode}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						{dataElements}
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

export default connect(mapStateToProps, mapDispatchToProps)(EntityModal);



