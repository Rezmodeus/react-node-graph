import ExampleGraph from './ExampleGraph'

console.log(ExampleGraph)
const emptyGraph = {
	nodes: [
		{
			'nid': 1,
			'type': 'Start',
			'x': 400,
			'y': 300,
			'fields': {
				'in': [],
				'out': [{name: 'startPoint', str: '->'}]
			}
		}
	],
	connections: []
};
export default {

	selectedNode: -1,
	nodeKey: 2,
	// graph: {...ExampleGraph}
	graph: {...emptyGraph}

};
