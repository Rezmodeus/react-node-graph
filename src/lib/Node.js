import React, {PropTypes} from 'react';
import onClickOutside from 'react-onclickoutside';

var Draggable = require('react-draggable');

import NodeInputList from './NodeInputList';
import NodeOuputList from './NodeOutputList';
import QuestText from './QuestText.react';

class Node extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: false
		}

		this.onStartConnector = this.onStartConnector.bind(this);
		this.onCompleteConnector = this.onCompleteConnector.bind(this);
		this.handleDragStart = this.handleDragStart.bind(this);
		this.handleDragStop = this.handleDragStop.bind(this);
		this.handleDragStart = this.handleDragStart.bind(this);
		this.handleDrag = this.handleDrag.bind(this);
	}

	handleDragStart(event, ui) {
		this.props.onNodeStart(this.props.nid, ui);
	}

	handleDragStop(event, ui) {
		this.props.onNodeStop(this.props.nid, ui.position);
	}

	handleDrag(event, ui) {
		this.props.onNodeMove(this.props.index, ui.position);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.selected !== nextState.selected || nextProps.outputs !== this.props.outputs;
	}

	onStartConnector(index) {
		this.props.onStartConnector(this.props.nid, index);
	}

	onCompleteConnector(index) {
		this.props.onCompleteConnector(this.props.nid, index);
	}

	handleClick(e) {
		this.setState({selected: true});
		if (this.props.onNodeSelect) {
			this.props.onNodeSelect(this.props.nid);
		}
	}

	handleClickOutside() {
		let {selected} = this.state;
		if (this.props.onNodeDeselect && selected) {
			this.props.onNodeDeselect(this.props.nid);
		}
		this.setState({selected: false});
	}

	render() {
		let {selected} = this.state;

		let nodeClass = 'node' + (selected ? ' selected' : '');

		const payload = {
			pos: this.props.pos,
			nid: this.props.nid,
			selected,
			color: this.props.color,
			title: this.props.title,
			inputs: this.props.inputs,
			outputs: this.props.outputs,
			onStartConnector: this.onStartConnector,
			handleDragStart: this.handleDragStart,
			handleDragStop: this.handleDragStop,
			handleDrag: this.handleDrag,
			onCompleteConnector: this.onCompleteConnector
		};
		return (
			<div onDoubleClick={(e) => {
				this.handleClick(e)
			}}>
				<QuestText {...payload}/>
				{/*<Draggable*/}
				{/*start={{x: this.props.pos.x, y: this.props.pos.y}}*/}
				{/*handle=".node-header"*/}
				{/*onStart={(event, ui) => this.handleDragStart(event, ui)}*/}
				{/*onStop={(event, ui) => this.handleDragStop(event, ui)}*/}
				{/*onDrag={(event, ui) => this.handleDrag(event, ui)}>*/}
				{/*<section className={nodeClass} style={{zIndex: 10000}}>*/}
				{/*<header className="node-header" style={{backgroundColor: this.props.color}}>*/}
				{/*<span className="node-title">{this.props.title}</span>*/}
				{/*</header>*/}
				{/*<div className="node-content">*/}
				{/*<NodeInputList items={this.props.inputs}*/}
				{/*onCompleteConnector={(index) => this.onCompleteConnector(index)}/>*/}
				{/*<NodeOuputList items={this.props.outputs}*/}
				{/*onStartConnector={(index) => this.onStartConnector(index)}/>*/}
				{/*</div>*/}
				{/*</section>*/}
				{/*</Draggable>*/}
			</div>
		);
	}
}

export default onClickOutside(Node);