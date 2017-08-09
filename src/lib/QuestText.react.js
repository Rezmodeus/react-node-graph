import React from 'react';
import NodeInputList from './NodeInputList';
import NodeOutputList from './NodeOutputList';
var Draggable = require('react-draggable');

export default function QuestText(props) {
	const {selected, color, title, inputs, outputs, pos,} = props;
	const {onStartConnector, onCompleteConnector, handleDragStart, handleDragStop, handleDrag} = props;
	const nodeClass = 'node' + (selected ? ' selected' : '');
	return (
		<Draggable
			start={{x: pos.x, y: pos.y}}
			handle=".node-header"
			onStart={(event, ui) => handleDragStart(event, ui)}
			onStop={(event, ui) => handleDragStop(event, ui)}
			onDrag={(event, ui) => handleDrag(event, ui)}>

			<section className={nodeClass} style={{zIndex: 10000}}>
				<header className="node-header" style={{backgroundColor: color}}>
					<span className="node-title">{title}</span>
				</header>
				<div className="node-content">
					<NodeInputList items={inputs}
					               onCompleteConnector={(index) => onCompleteConnector(index)}/>
					<NodeOutputList items={outputs} onStartConnector={(index) => onStartConnector(index)}/>
				</div>
			</section>
		</Draggable>

	)
}

